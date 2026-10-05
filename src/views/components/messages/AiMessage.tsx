import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { formatTime } from '../../../utils/formatTime';
import { LONG_PRESS_MS } from '../../../utils/constants';
import { AiMessage as AiMessageType } from '../../../models/types';
import { SparkleIcon } from '../icons';
import { RecommendationCarousel } from '../recommendations/RecommendationCarousel';
import { FeedbackRow } from './FeedbackRow';
import { ReasonChips } from './ReasonChips';
import { MessageRowProps } from './types';

function AiMessageBase({ message, actions }: MessageRowProps<AiMessageType>) {
  const { id, feedback } = message;

  const openSheet = useCallback(() => actions.onOpenSheet(id), [actions, id]);
  const onLike = useCallback(() => actions.onLike(id), [actions, id]);
  const onDislike = useCallback(() => actions.onDislike(id), [actions, id]);
  const onPickReason = useCallback(
    (reason: string) => actions.onPickReason(id, reason),
    [actions, id],
  );

  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <SparkleIcon size={13} color={colors.gold} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          <Text style={styles.labelName}>AI Astrologer</Text>
          <Text style={styles.labelTime}> · {formatTime(message.timestamp)}</Text>
        </Text>

        <Pressable
          onLongPress={openSheet}
          delayLongPress={LONG_PRESS_MS}
          accessibilityRole="text"
          style={styles.bubble}>
          <Text style={[typography.messageBody, styles.bubbleText]}>{message.text}</Text>
        </Pressable>

        {!!message.recommendations?.length && (
          <RecommendationCarousel
            recommendations={message.recommendations}
            onPressCard={actions.onPressRecommendation}
          />
        )}

        <FeedbackRow
          value={feedback.value}
          onLike={onLike}
          onDislike={onDislike}
          onOpenSheet={openSheet}
        />

        {feedback.value === 'dislike' && (
          <ReasonChips selected={feedback.reason} onPick={onPickReason} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  content: { flex: 1, minWidth: 0, gap: 10 },
  label: {},
  labelName: { ...typography.meta, color: colors.gold, fontWeight: '600' },
  labelTime: { ...typography.meta, color: colors.textMuted },
  bubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: radii.bubbleTail,
    borderTopRightRadius: radii.bubble,
    borderBottomLeftRadius: radii.bubble,
    borderBottomRightRadius: radii.bubble,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  bubbleText: { color: colors.text },
});

export const AiMessage = memo(AiMessageBase);
