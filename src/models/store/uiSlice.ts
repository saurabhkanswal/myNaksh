import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReplyQuote } from '../types';

export interface UiState {
  draft: string;
  /** Quote being replied to, shown above the composer. */
  replyTo: ReplyQuote | null;
  /** Id of the message whose action sheet is open, or null. */
  actionSheetId: string | null;
  /** Current toast message, or null. */
  toast: string | null;
}

const initialState: UiState = {
  draft: '',
  replyTo: null,
  actionSheetId: null,
  toast: null,
};

/**
 * Ephemeral UI state, kept separate from domain state so view concerns never
 * leak into the conversation model.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDraft(state, action: PayloadAction<string>) {
      state.draft = action.payload;
    },
    clearDraft(state) {
      state.draft = '';
    },
    setReplyTo(state, action: PayloadAction<ReplyQuote | null>) {
      state.replyTo = action.payload;
    },
    openActionSheet(state, action: PayloadAction<string>) {
      state.actionSheetId = action.payload;
    },
    closeActionSheet(state) {
      state.actionSheetId = null;
    },
    setToast(state, action: PayloadAction<string | null>) {
      state.toast = action.payload;
    },
  },
});

export const {
  setDraft,
  clearDraft,
  setReplyTo,
  openActionSheet,
  closeActionSheet,
  setToast,
} = uiSlice.actions;

export default uiSlice.reducer;
