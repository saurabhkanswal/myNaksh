import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { CARD_WIDTH } from '../../../utils/constants';
import { Recommendation } from '../../../models/types';
import { ArrowRightIcon } from '../icons';
import { resolveRecommendation } from './registry';

interface Props {
  recommendation: Recommendation;
  onPress: (rec: Recommendation) => void;
}

/**
 * Shared card shell. All type-specific differences come from the registry
 * config; the shell only switches presentation by `variant`.
 */
function RecommendationCardBase({ recommendation, onPress }: Props) {
  const config = resolveRecommendation(recommendation.type);
  const { Visual, variant = 'default' } = config;
  const isHighlight = variant === 'highlight';
  const isFallback = variant === 'fallback';

  const subtitle = recommendation.subtitle ?? config.defaultSubtitle;

  const tagColor = isHighlight ? colors.textOnGoldMuted : colors.gold;
  const titleColor = isHighlight ? colors.textOnGold : colors.text;
  const subtitleColor = isHighlight ? colors.textOnGoldMuted : colors.textMuted;
  const ctaColor = isHighlight ? colors.textOnGold : colors.goldLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${config.tag}: ${recommendation.title}`}
      onPress={() => onPress(recommendation)}
      style={[
        styles.card,
        isHighlight && styles.cardHighlight,
        isFallback && styles.cardFallback,
      ]}>
      <View
        style={[
          styles.visual,
          isHighlight && styles.visualHighlight,
          isFallback && styles.visualFallback,
        ]}>
        <Visual />
      </View>
      <View style={styles.body}>
        <Text style={[typography.eyebrow, { color: tagColor }]}>{config.tag}</Text>
        <Text style={[typography.cardTitle, { color: titleColor }]} numberOfLines={2}>
          {recommendation.title}
        </Text>
        {!!subtitle && (
          <Text style={[typography.meta, { color: subtitleColor }]} numberOfLines={2}>
            {subtitle}
          </Text>
        )}
        <View style={styles.ctaRow}>
          <Text style={[styles.cta, { color: ctaColor }]}>{config.cta}</Text>
          <ArrowRightIcon color={ctaColor} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardHighlight: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  cardFallback: {
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderColor: colors.fallbackBorder,
  },
  visual: {
    height: 88,
    backgroundColor: colors.surfaceSunken,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualHighlight: {
    backgroundColor: colors.goldDeep,
    borderBottomColor: 'rgba(26,18,6,0.2)',
  },
  visualFallback: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: colors.fallbackBorder,
  },
  body: {
    padding: 12,
    paddingBottom: 14,
    gap: 4,
    flex: 1,
  },
  ctaRow: {
    marginTop: 'auto',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cta: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export const RecommendationCard = memo(RecommendationCardBase);
