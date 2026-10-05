import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { FeedbackValue } from '../../../models/types';
import { MoreHorizontalIcon, ThumbDownIcon, ThumbUpIcon } from '../icons';

interface Props {
  value: FeedbackValue;
  onLike: () => void;
  onDislike: () => void;
  onOpenSheet: () => void;
}

const HIT = { top: 4, bottom: 4, left: 4, right: 4 };

export function FeedbackRow({ value, onLike, onDislike, onOpenSheet }: Props) {
  const likeOn = value === 'like';
  const dislikeOn = value === 'dislike';

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Like"
        accessibilityState={{ selected: likeOn }}
        hitSlop={HIT}
        onPress={onLike}
        style={[styles.pill, likeOn ? styles.likeOn : styles.off]}>
        <ThumbUpIcon color={likeOn ? colors.goldLight : colors.textMuted} filled={likeOn} />
        {likeOn && <Text style={[styles.label, { color: colors.goldLight }]}>Helpful</Text>}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dislike"
        accessibilityState={{ selected: dislikeOn }}
        hitSlop={HIT}
        onPress={onDislike}
        style={[styles.pill, dislikeOn ? styles.dislikeOn : styles.off]}>
        <ThumbDownIcon color={dislikeOn ? colors.dangerText : colors.textMuted} filled={dislikeOn} />
        {dislikeOn && <Text style={[styles.label, { color: colors.dangerText }]}>Not helpful</Text>}
      </Pressable>

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Message options"
        hitSlop={HIT}
        onPress={onOpenSheet}
        style={styles.optionsBtn}>
        <MoreHorizontalIcon size={20} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pill: {
    height: 40,
    minWidth: 44,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  off: { borderColor: colors.border, backgroundColor: 'transparent' },
  likeOn: { borderColor: colors.gold, backgroundColor: colors.likeOnBg },
  dislikeOn: { borderColor: colors.danger, backgroundColor: colors.dislikeOnBg },
  label: { ...typography.meta, fontWeight: '600' },
  spacer: { flex: 1 },
  optionsBtn: { width: 44, height: 40, alignItems: 'center', justifyContent: 'center' },
});
