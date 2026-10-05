/** Timing + layout constants shared across layers. */

/** Simulated network latency for loading the conversation. */
export const LOAD_DELAY_MS = 1000;

/** Simulated send round-trip before a message resolves to sent/failed. */
export const DELIVER_DELAY_MS = 1400;

/** Toast auto-hide duration. */
export const TOAST_DURATION_MS = 1800;

/** Long-press duration to open the message action sheet. */
export const LONG_PRESS_MS = 450;

/** Recommendation card width + gap → FlatList snap interval. */
export const CARD_WIDTH = 156;
export const CARD_GAP = 10;
export const CARD_SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

/** Dislike feedback reason chips. */
export const FEEDBACK_REASONS = ['Inaccurate', 'Too Generic', "Didn't Help", 'Too Long'] as const;

/** Empty-state prompt starters. */
export const PROMPT_STARTERS = [
  'How does my career look this year?',
  'Tell me about my relationships.',
  "What's in my birth chart?",
] as const;
