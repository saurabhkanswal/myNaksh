import { GroupedMessage, Message } from '../models/types';

/** Senders whose consecutive messages visually group together. */
const GROUPABLE: ReadonlySet<Message['type']> = new Set(['user', 'ai', 'human']);

/**
 * Pure grouping transform. Consecutive messages from the same groupable sender
 * form a group; only the last message in a group shows meta (timestamp/status)
 * and the bubble tail. `system` and `date` messages are always standalone.
 */
export function groupMessages(messages: Message[]): GroupedMessage[] {
  return messages.map((message, i) => {
    if (!GROUPABLE.has(message.type)) {
      return { message, isLastInGroup: true };
    }
    const next = messages[i + 1];
    const isLastInGroup = !next || next.type !== message.type;
    return { message, isLastInGroup };
  });
}
