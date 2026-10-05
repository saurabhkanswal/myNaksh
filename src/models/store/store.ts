import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
