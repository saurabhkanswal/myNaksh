import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, spacing } from '../../../theme/tokens';
import { fonts, typography } from '../../../theme/typography';

interface Props {
  onRetry: () => void;
}

/** Error screen: broken-orbit icon, message, and a Retry button. */
export function ErrorState({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
          <Circle
            cx={28}
            cy={28}
            r={22}
            stroke={colors.dangerText}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="34 20"
          />
          <Circle cx={28} cy={28} r={5} fill={colors.dangerText} />
        </Svg>
      </View>

      <Text style={styles.title}>Unable to load conversation</Text>
      <Text style={styles.body}>
        The stars are fine — the connection isn't. Check your network and try again.
      </Text>

      <Pressable accessibilityRole="button" accessibilityLabel="Retry" onPress={onRetry} style={styles.retry}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: spacing.lg },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(232,128,106,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.display, fontWeight: '600', fontSize: 32, lineHeight: 36, color: colors.text, textAlign: 'center' },
  body: { ...typography.messageBody, color: colors.textMuted, textAlign: 'center', maxWidth: 300 },
  retry: {
    height: 52,
    paddingHorizontal: 40,
    borderRadius: 26,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  retryText: { fontSize: 16, fontWeight: '700', color: colors.textOnGold },
});
