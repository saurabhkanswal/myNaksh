import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { CARD_GAP, CARD_SNAP_INTERVAL } from '../../../utils/constants';
import { Recommendation } from '../../../models/types';
import { SparkleIcon } from '../icons';
import { RecommendationCard } from './RecommendationCard';

interface Props {
  recommendations: Recommendation[];
  onPressCard: (rec: Recommendation) => void;
}

/** "Suggested for you" eyebrow + horizontally snapping card list. */
export function RecommendationCarousel({ recommendations, onPressCard }: Props) {
  const renderItem = useCallback<ListRenderItem<Recommendation>>(
    ({ item }) => <RecommendationCard recommendation={item} onPress={onPressCard} />,
    [onPressCard],
  );

  const Separator = useCallback(() => <View style={styles.gap} />, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.eyebrowRow}>
        <SparkleIcon size={12} color={colors.gold} />
        <Text style={[typography.eyebrow, styles.eyebrowText]}>Suggested for you</Text>
        <View style={styles.rule} />
      </View>
      <FlatList
        horizontal
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_SNAP_INTERVAL}
        decelerationRate="fast"
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10, marginTop: 2 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  eyebrowText: { color: colors.textMuted, letterSpacing: 1.4 },
  rule: { flex: 1, height: 1, backgroundColor: colors.hairline },
  gap: { width: CARD_GAP },
  // bleed to the right screen edge
  listContent: { paddingRight: spacing.lg },
});
