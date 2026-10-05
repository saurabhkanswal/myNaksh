import { Message, Recommendation } from '../../../models/types';

/** Callbacks passed down to message rows. Rows stay presentational. */
export interface MessageActions {
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onPickReason: (id: string, reason: string) => void;
  onOpenSheet: (id: string) => void;
  onPressRecommendation: (rec: Recommendation) => void;
  onRetry: (id: string) => void;
}

export interface MessageRowProps<M extends Message = Message> {
  message: M;
  isLastInGroup: boolean;
  actions: MessageActions;
}
