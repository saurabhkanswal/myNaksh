import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../models/store/store';

/** A thunk-based use-case. Controllers are the only place side effects live. */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

export type { AppDispatch, RootState };
