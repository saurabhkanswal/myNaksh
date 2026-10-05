import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { typography } from '../../theme/typography';
import { ReplyQuote } from '../../models/types';
import { CloseIcon, ReplyIcon } from './icons';

interface Props {
  quote: ReplyQuote;
  onCancel: () => void;
}

/** Shown above the composer while composing a reply. */
export function ReplyPreview({ quote, onCancel }: Props) {
  return (
    <View style={styles.row}>
      <ReplyIcon size={18} color={colors.gold} />
      <View style={styles.block}>
        <Text style={styles.label}>Replying to {quote.senderName}</Text>
        <Text style={styles.quote} numberOfLines={1}>
          {quote.text}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Cancel reply"
        onPress={onCancel}
        style={styles.closeBtn}>
        <CloseIcon size={18} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: colors.surfaceMuted,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  block: {
    flex: 1,
    minWidth: 0,
    gap: 2,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
  },
  label: { ...typography.meta, color: colors.gold, fontWeight: '600' },
  quote: { ...typography.meta, fontSize: 13, color: colors.textMuted },
  closeBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
