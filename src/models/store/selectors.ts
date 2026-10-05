import { createSelector } from '@reduxjs/toolkit';
import { groupMessages } from '../../utils/grouping';
import { AiMessage, Message } from '../types';
import { RootState } from './store';

export const selectStatus = (s: RootState) => s.conversation.status;
export const selectError = (s: RootState) => s.conversation.error;
export const selectMessages = (s: RootState) => s.conversation.messages;

export const selectDraft = (s: RootState) => s.ui.draft;
export const selectReplyTo = (s: RootState) => s.ui.replyTo;
export const selectActionSheetId = (s: RootState) => s.ui.actionSheetId;
export const selectToast = (s: RootState) => s.ui.toast;

/** Messages decorated with grouping info; memoized against the message array. */
export const selectGroupedMessages = createSelector([selectMessages], messages =>
  groupMessages(messages),
);

/** Loaded with no chat messages → show the empty state. */
export const selectIsEmpty = createSelector(
  [selectStatus, selectMessages],
  (status, messages) =>
    status === 'loaded' &&
    !messages.some(m => m.type === 'user' || m.type === 'ai' || m.type === 'human'),
);

/** A single message by id — lets a row subscribe narrowly to its own data. */
export const makeSelectMessageById = (id: string) => (s: RootState): Message | undefined =>
  s.conversation.messages.find(m => m.id === id);

/** The message targeted by the open action sheet (if any). */
export const selectActionSheetMessage = createSelector(
  [selectMessages, selectActionSheetId],
  (messages, id) => (id ? messages.find(m => m.id === id) : undefined),
);

/** Narrow helper used by the action sheet / copy flows. */
export function getMessageText(message: Message | undefined): string {
  if (!message) {
    return '';
  }
  switch (message.type) {
    case 'ai':
    case 'human':
    case 'user':
    case 'system':
      return message.text;
    default:
      return '';
  }
}

export function asAiMessage(message: Message | undefined): AiMessage | undefined {
  return message && message.type === 'ai' ? message : undefined;
}
