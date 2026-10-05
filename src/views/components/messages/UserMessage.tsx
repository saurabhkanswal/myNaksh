import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { formatTime } from '../../../utils/formatTime';
import { UserMessage as UserMessageType } from '../../../models/types';
import { AlertCircleIcon, CheckCheckIcon, ClockIcon, RotateCwIcon } from '../icons';
import { MessageRowProps } from './types';

function UserMessageBase({ message, isLastInGroup, actions }: MessageRowProps<UserMessageType>) {
  const { status } = message;
  const isFailed = status === 'failed';
  const isSending = status === 'sending';

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.bubble,
          { borderBottomRightRadius: isLastInGroup ? radii.bubbleTail : radii.bubble },
          isSending && styles.bubbleSending,
          isFailed && styles.bubbleFailed,
        ]}>
        {!!message.reply && (
          <View style={[styles.quote, isFailed && styles.quoteFailed]}>
            <Text
              style={[styles.quoteName, isFailed && styles.quoteNameFailed]}
              numberOfLines={1}>
              {message.reply.senderName}
            </Text>
            <Text
              style={[styles.quoteText, isFailed && styles.quoteTextFailed]}
              numberOfLines={2}>
              {message.reply.text}
            </Text>
          </View>
        )}
        <Text style={[typography.messageBody, isFailed ? styles.textFailed : styles.text]}>
          {message.text}
        </Text>
      </View>

      {isLastInGroup && (
        <View style={styles.metaRow}>
          {isSending && (
            <>
              <ClockIcon size={13} color={colors.textMuted} />
              <Text style={styles.meta}>Sending…</Text>
            </>
          )}
          {status === 'sent' && (
            <>
              <Text style={styles.meta}>{formatTime(message.timestamp)}</Text>
              <CheckCheckIcon size={15} color={colors.gold} />
            </>
          )}
          {isFailed && (
            <>
              <AlertCircleIcon size={14} color={colors.dangerText} />
              <Text style={styles.metaFailed}>Failed to send</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Retry sending message"
                onPress={() => actions.onRetry(message.id)}
                style={styles.retryPill}>
                <RotateCwIcon size={13} color={colors.goldLight} />
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'flex-end', gap: 4 },
  bubble: {
    maxWidth: '78%',
    backgroundColor: colors.gold,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopLeftRadius: radii.bubble,
    borderTopRightRadius: radii.bubble,
    borderBottomLeftRadius: radii.bubble,
    gap: 6,
  },
  bubbleSending: { opacity: 0.62 },
  bubbleFailed: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.danger,
  },
  text: { color: colors.textOnGold },
  textFailed: { color: colors.text },
  quote: {
    backgroundColor: colors.quoteBg,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  quoteName: { ...typography.meta, color: colors.textOnGold, fontWeight: '700' },
  quoteText: { ...typography.meta, color: colors.textOnGold },
  quoteFailed: { backgroundColor: colors.surfaceMuted },
  quoteNameFailed: { color: colors.text },
  quoteTextFailed: { color: colors.textSoft },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { ...typography.meta, color: colors.textMuted, fontSize: 11 },
  metaFailed: { ...typography.meta, color: colors.dangerText },
  retryPill: {
    marginLeft: 2,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.dangerBorderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  retryText: { ...typography.meta, color: colors.goldLight, fontWeight: '600' },
});

export const UserMessage = memo(UserMessageBase);
