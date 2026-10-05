import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../../../theme/tokens';
import { fonts } from '../../../theme/typography';
import { OrbitSpinner } from '../../components/OrbitSpinner';
import { Skeleton } from '../../components/Skeleton';

const CARD_TONE = colors.humanAvatarBg;

/** Loading screen: pulsing skeleton shapes + centered orbit spinner. */
export function LoadingState() {
  return (
    <View style={styles.container}>
      <View style={styles.skeletons}>
        <Skeleton style={styles.systemPill} />
        <Skeleton style={styles.userBubble} />
        <View style={styles.aiRow}>
          <Skeleton style={styles.avatar} />
          <View style={styles.aiCol}>
            <Skeleton style={styles.aiBubble} />
            <View style={styles.cards}>
              <Skeleton style={styles.card} tone={CARD_TONE} />
              <Skeleton style={styles.card} tone={CARD_TONE} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.center}>
        <OrbitSpinner />
        <Text style={styles.label}>Loading conversation…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  skeletons: { padding: spacing.lg, gap: spacing.lg },
  systemPill: { alignSelf: 'center', width: 190, height: 34, borderRadius: radii.pill },
  userBubble: { alignSelf: 'flex-end', width: 210, height: 46, borderRadius: radii.bubble },
  aiRow: { flexDirection: 'row', gap: spacing.sm },
  avatar: { width: 28, height: 28, borderRadius: 14, marginTop: 20 },
  aiCol: { flex: 1, gap: spacing.md },
  aiBubble: { height: 64, borderRadius: radii.bubble },
  cards: { flexDirection: 'row', gap: 10 },
  card: { width: 140, height: 168, borderRadius: radii.card },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  label: { fontFamily: fonts.display, fontSize: 24, color: colors.text },
});
