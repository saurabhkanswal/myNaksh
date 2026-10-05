import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../../theme/tokens';
import { fonts, typography } from '../../../theme/typography';
import { PROMPT_STARTERS } from '../../../utils/constants';
import { SparkleIcon } from '../../components/icons';
import { SaturnVisual } from '../../components/recommendations/visuals';

interface Props {
  onSend: (text: string) => void;
}

/** Empty conversation: concentric rings + Saturn art, title, prompt starters. */
export function EmptyState({ onSend }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.ringOuter}>
        <View style={styles.ringInner}>
          <SaturnVisual />
        </View>
      </View>

      <Text style={styles.title}>Start your conversation</Text>
      <Text style={styles.body}>Ask about career, relationships or anything in your birth chart.</Text>

      <View style={styles.starters}>
        {PROMPT_STARTERS.map(text => (
          <Pressable
            key={text}
            accessibilityRole="button"
            onPress={() => onSend(text)}
            style={styles.starter}>
            <SparkleIcon size={16} color={colors.gold} />
            <Text style={styles.starterText}>{text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: spacing.lg },
  ringOuter: {
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.display, fontWeight: '600', fontSize: 34, lineHeight: 38, color: colors.text, textAlign: 'center', marginTop: spacing.sm },
  body: { ...typography.messageBody, color: colors.textMuted, textAlign: 'center', maxWidth: 300 },
  starters: { alignSelf: 'stretch', gap: 10, marginTop: spacing.sm },
  starter: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  starterText: { ...typography.messageBody, color: colors.text, flex: 1 },
});
