import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ConversationStatus,
  FeedbackValue,
  Message,
  SendStatus,
} from '../types';

export interface ConversationState {
  status: ConversationStatus;
  messages: Message[];
  error?: string;
}

const initialState: ConversationState = {
  status: 'loading',
  messages: [],
};

/**
 * Domain state. Reducers are pure, synchronous mutations only — all async
 * orchestration lives in the controllers. This keeps the data-flow one-way:
 * controller → dispatch(reducer) → store → view.
 */
const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<ConversationStatus>) {
      state.status = action.payload;
      if (action.payload !== 'error') {
        state.error = undefined;
      }
    },
    loadFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
      state.status = 'loaded';
      state.error = undefined;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    updateMessageStatus(
      state,
      action: PayloadAction<{ id: string; status: SendStatus }>,
    ) {
      const msg = state.messages.find(m => m.id === action.payload.id);
      if (msg && msg.type === 'user') {
        msg.status = action.payload.status;
      }
    },
    removeMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter(m => m.id !== action.payload);
    },
    setFeedback(
      state,
      action: PayloadAction<{ id: string; value: FeedbackValue }>,
    ) {
      const msg = state.messages.find(m => m.id === action.payload.id);
      if (msg && msg.type === 'ai') {
        msg.feedback = { value: action.payload.value };
      }
    },
    setFeedbackReason(
      state,
      action: PayloadAction<{ id: string; reason?: string }>,
    ) {
      const msg = state.messages.find(m => m.id === action.payload.id);
      if (msg && msg.type === 'ai') {
        msg.feedback = { ...msg.feedback, reason: action.payload.reason };
      }
    },
  },
});

export const {
  setStatus,
  loadFailed,
  setMessages,
  addMessage,
  updateMessageStatus,
  removeMessage,
  setFeedback,
  setFeedbackReason,
} = conversationSlice.actions;

export default conversationSlice.reducer;
