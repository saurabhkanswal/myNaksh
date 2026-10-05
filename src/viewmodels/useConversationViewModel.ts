import { useCallback, useEffect, useMemo } from 'react';
import {
  copyText,
  deleteMessage,
  loadConversation,
  pickFeedbackReason,
  retryMessage,
  sendMessage,
  showToast,
  startReply,
  toggleFeedback,
} from '../controllers';
import { useAppDispatch, useAppSelector } from '../models/store/hooks';
import {
  selectActionSheetId,
  selectActionSheetMessage,
  selectDraft,
  selectError,
  selectGroupedMessages,
  selectIsEmpty,
  selectReplyTo,
  selectStatus,
  selectToast,
} from '../models/store/selectors';
import { closeActionSheet, openActionSheet, setDraft, setReplyTo } from '../models/store/uiSlice';
import { Message, Recommendation } from '../models/types';
import { senderName } from './senderName';

/**
 * The one bridge views consume. Reads state via selectors and exposes stable,
 * view-ready callbacks that dispatch controllers. Views never touch the store,
 * services, or controllers directly — keeping data flow one-directional.
 */
export function useConversationViewModel() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const isEmpty = useAppSelector(selectIsEmpty);
  const groupedMessages = useAppSelector(selectGroupedMessages);
  const draft = useAppSelector(selectDraft);
  const replyTo = useAppSelector(selectReplyTo);
  const actionSheetId = useAppSelector(selectActionSheetId);
  const actionSheetMessage = useAppSelector(selectActionSheetMessage);
  const toast = useAppSelector(selectToast);

  // Load on first mount.
  useEffect(() => {
    dispatch(loadConversation());
  }, [dispatch]);

  const load = useCallback(() => dispatch(loadConversation()), [dispatch]);
  const send = useCallback(
    (text: string) => dispatch(sendMessage(text)),
    [dispatch],
  );
  const sendDraft = useCallback(() => dispatch(sendMessage(draft)), [dispatch, draft]);
  const retry = useCallback((id: string) => dispatch(retryMessage(id)), [dispatch]);
  const changeDraft = useCallback((text: string) => dispatch(setDraft(text)), [dispatch]);
  const cancelReply = useCallback(() => dispatch(setReplyTo(null)), [dispatch]);

  const like = useCallback((id: string) => dispatch(toggleFeedback(id, 'like')), [dispatch]);
  const dislike = useCallback((id: string) => dispatch(toggleFeedback(id, 'dislike')), [dispatch]);
  const pickReason = useCallback(
    (id: string, reason: string) => dispatch(pickFeedbackReason(id, reason)),
    [dispatch],
  );

  const openSheet = useCallback((id: string) => dispatch(openActionSheet(id)), [dispatch]);
  const closeSheet = useCallback(() => dispatch(closeActionSheet()), [dispatch]);

  const reply = useCallback(
    (message: Message) => {
      if ('text' in message) {
        dispatch(startReply({ senderName: senderName(message), text: message.text }));
      }
      dispatch(closeActionSheet());
    },
    [dispatch],
  );
  const copy = useCallback(
    (message: Message) => {
      if ('text' in message) {
        dispatch(copyText(message.text));
      }
      dispatch(closeActionSheet());
    },
    [dispatch],
  );
  const remove = useCallback(
    (id: string) => {
      dispatch(closeActionSheet());
      dispatch(deleteMessage(id));
    },
    [dispatch],
  );

  const tapRecommendation = useCallback(
    (rec: Recommendation) => dispatch(showToast(`Opening ${rec.title}`)),
    [dispatch],
  );

  return useMemo(
    () => ({
      // state
      status,
      error,
      isEmpty,
      groupedMessages,
      draft,
      replyTo,
      actionSheetId,
      actionSheetMessage,
      toast,
      // actions
      load,
      send,
      sendDraft,
      retry,
      changeDraft,
      cancelReply,
      like,
      dislike,
      pickReason,
      openSheet,
      closeSheet,
      reply,
      copy,
      remove,
      tapRecommendation,
    }),
    [
      status,
      error,
      isEmpty,
      groupedMessages,
      draft,
      replyTo,
      actionSheetId,
      actionSheetMessage,
      toast,
      load,
      send,
      sendDraft,
      retry,
      changeDraft,
      cancelReply,
      like,
      dislike,
      pickReason,
      openSheet,
      closeSheet,
      reply,
      copy,
      remove,
      tapRecommendation,
    ],
  );
}

export type ConversationViewModel = ReturnType<typeof useConversationViewModel>;
