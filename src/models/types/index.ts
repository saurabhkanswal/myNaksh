/**
 * Domain + view types. Pure — no React, no Redux imports here.
 */

export type ConversationStatus = 'loading' | 'loaded' | 'error';

export type SendStatus = 'sending' | 'sent' | 'failed';

export type Sender = 'user' | 'ai' | 'human';

/** Known recommendation kinds; unknown strings fall back to the generic card. */
export type RecommendationType =
  | 'gemstone'
  | 'tarot'
  | 'consultation'
  | 'article'
  | 'promotion'
  | 'panchang'
  | 'remedy'
  | (string & {}); // allow unknown API values without losing autocomplete

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  subtitle?: string;
}

export type FeedbackValue = 'like' | 'dislike' | null;

export interface Feedback {
  value: FeedbackValue;
  reason?: string;
}

/** A quoted message shown when a user replies to something. */
export interface ReplyQuote {
  senderName: string;
  text: string;
}

interface BaseMessage {
  id: string;
  /** epoch ms — formatting is a view concern (see utils/formatTime). */
  timestamp: number;
}

export interface SystemMessage extends BaseMessage {
  type: 'system';
  text: string;
}

export interface DateSeparatorMessage extends BaseMessage {
  type: 'date';
  label: string;
}

export interface UserMessage extends BaseMessage {
  type: 'user';
  text: string;
  status: SendStatus;
  reply?: ReplyQuote;
}

export interface AiMessage extends BaseMessage {
  type: 'ai';
  text: string;
  recommendations?: Recommendation[];
  feedback: Feedback;
}

export interface HumanMessage extends BaseMessage {
  type: 'human';
  text: string;
}

export type Message =
  | SystemMessage
  | DateSeparatorMessage
  | UserMessage
  | AiMessage
  | HumanMessage;

/**
 * View model of a message after grouping is applied. `isLastInGroup` drives
 * whether meta (timestamp/status) and the bubble tail are shown.
 */
export interface GroupedMessage {
  message: Message;
  isLastInGroup: boolean;
}
