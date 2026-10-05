import { conversationService } from '../models/services/conversationService';
import {
  addMessage,
  loadFailed,
  removeMessage,
  setFeedback,
  setFeedbackReason,
  setMessages,
  setStatus,
  updateMessageStatus,
} from '../models/store/conversationSlice';
import { clearDraft, setReplyTo } from '../models/store/uiSlice';
import { FeedbackValue, UserMessage } from '../models/types';
import { createId } from '../utils/id';
import { AppThunk } from './types';
import { showToast } from './uiController';

/** Load (or reload) the conversation from the service. */
export const loadConversation = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const messages = await conversationService.loadConversation();
    dispatch(setMessages(messages));
  } catch (e) {
    dispatch(loadFailed(e instanceof Error ? e.message : 'Failed to load'));
  }
};

/** Optimistically add a user message, then resolve its delivery status. */
export const sendMessage =
  (rawText: string): AppThunk =>
  async (dispatch, getState) => {
    const text = rawText.trim();
    if (!text) {
      return;
    }
    const id = createId('u');
    const reply = getState().ui.replyTo ?? undefined;
    const message: UserMessage = {
      id,
      type: 'user',
      text,
      status: 'sending',
      timestamp: Date.now(),
      reply,
    };
    dispatch(addMessage(message));
    dispatch(clearDraft());
    dispatch(setReplyTo(null));

    const status = await conversationService.deliverMessage();
    dispatch(updateMessageStatus({ id, status }));
  };

/** Retry a failed send; retries always succeed per the mockup. */
export const retryMessage =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(updateMessageStatus({ id, status: 'sending' }));
    const status = await conversationService.retryDelivery();
    dispatch(updateMessageStatus({ id, status }));
  };

/** Delete a message and confirm with a toast. */
export const deleteMessage =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(removeMessage(id));
    dispatch(setReplyTo(null));
    dispatch(showToast('Message deleted'));
  };

/** Toggle like/dislike on an AI message (tapping the active value clears it). */
export const toggleFeedback =
  (id: string, value: Exclude<FeedbackValue, null>): AppThunk =>
  (dispatch, getState) => {
    const msg = getState().conversation.messages.find(m => m.id === id);
    const current = msg && msg.type === 'ai' ? msg.feedback.value : null;
    dispatch(setFeedback({ id, value: current === value ? null : value }));
  };

/** Toggle a dislike reason chip. */
export const pickFeedbackReason =
  (id: string, reason: string): AppThunk =>
  (dispatch, getState) => {
    const msg = getState().conversation.messages.find(m => m.id === id);
    const current = msg && msg.type === 'ai' ? msg.feedback.reason : undefined;
    dispatch(setFeedbackReason({ id, reason: current === reason ? undefined : reason }));
  };
