import { Message } from '../models/types';

/** Human-readable sender label used in labels and reply quotes. */
export function senderName(message: Message): string {
  switch (message.type) {
    case 'human':
      return 'Your Astrologer';
    case 'user':
      return 'You';
    default:
      return 'AI Astrologer';
  }
}
