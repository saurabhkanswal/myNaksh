import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { FEEDBACK_REASONS } from '../../../utils/constants';

interface Props {
  selected?: string;
  onPick: (reason: string) => void;
}

/** "What went wrong?" reason chips shown when dislike is active. */
export function ReasonChips({ selected, onPick }: Props) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>What went wrong?</Text>
      <View style={styles.chips}>
        {FEEDBACK_REASONS.map(reason => {
          const on = selected === reason;
          return (
            <Pressable
              key={reason}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              hitSlop={{ top: 4, bottom: 4 }}
              onPress={() => onPick(reason)}
              style={[styles.chip, on ? styles.chipOn : styles.chipOff]}>
              <Text style={[styles.chipText, on ? styles.chipTextOn : styles.chipTextOff]}>
                {reason}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!!selected && (
        <Text style={styles.thanks}>Thanks — we'll use this to tune future readings.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.dislikePanelBorder,
    borderRadius: radii.card,
    padding: 14,
    gap: 10,
  },
  title: { ...typography.meta, fontSize: 13, color: colors.text, fontWeight: '600' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: radii.chip,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipOff: { borderColor: colors.chipBorder, backgroundColor: 'transparent' },
  chipOn: { borderColor: colors.gold, backgroundColor: colors.gold },
  chipText: { fontSize: 13 },
  chipTextOff: { color: '#E6DAC0', fontWeight: '500' },
  chipTextOn: { color: colors.textOnGold, fontWeight: '600' },
  thanks: { ...typography.meta, color: colors.textMuted },
});
