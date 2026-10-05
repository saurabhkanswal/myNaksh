import Clipboard from '@react-native-clipboard/clipboard';
import { AccessibilityInfo } from 'react-native';
import { setReplyTo, setToast } from '../models/store/uiSlice';
import { TOAST_DURATION_MS } from '../utils/constants';
import { ReplyQuote } from '../models/types';
import { AppThunk } from './types';

let toastTimer: ReturnType<typeof setTimeout> | null = null;

/** Show a toast, announce it for screen readers, and auto-hide it. */
export const showToast =
  (message: string): AppThunk =>
  dispatch => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    dispatch(setToast(message));
    AccessibilityInfo.announceForAccessibility(message);
    toastTimer = setTimeout(() => {
      dispatch(setToast(null));
      toastTimer = null;
    }, TOAST_DURATION_MS);
  };

/** Copy text to the clipboard and confirm with a toast. */
export const copyText =
  (text: string): AppThunk =>
  dispatch => {
    Clipboard.setString(text);
    dispatch(showToast('Copied to clipboard'));
  };

/** Begin replying to a message. */
export const startReply =
  (quote: ReplyQuote): AppThunk =>
  dispatch => {
    dispatch(setReplyTo(quote));
  };
