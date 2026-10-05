import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { formatTime } from '../../../utils/formatTime';
import { HumanMessage as HumanMessageType } from '../../../models/types';
import { PersonIcon } from '../icons';
import { MessageRowProps } from './types';

function HumanMessageBase({ message }: MessageRowProps<HumanMessageType>) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <PersonIcon size={15} color={colors.goldLight} />
      </View>

      <View style={styles.content}>
        <View style={styles.labelRow}>
          <Text style={styles.labelName}>Your Astrologer</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>HUMAN</Text>
          </View>
          <Text style={styles.labelTime}> · {formatTime(message.timestamp)}</Text>
        </View>
        <View style={styles.bubble}>
          <Text style={[typography.messageBody, styles.bubbleText]}>{message.text}</Text>
        </View>
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
    borderColor: colors.goldLight,
    backgroundColor: colors.humanAvatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  content: { flex: 1, minWidth: 0, gap: 6 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  labelName: { ...typography.meta, color: colors.goldLight, fontWeight: '600' },
  labelTime: { ...typography.meta, color: colors.textMuted },
  badge: {
    backgroundColor: colors.goldLight,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: colors.textOnGold,
  },
  bubble: {
    maxWidth: '88%',
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.humanBorder,
    borderTopLeftRadius: radii.bubbleTail,
    borderTopRightRadius: radii.bubble,
    borderBottomLeftRadius: radii.bubble,
    borderBottomRightRadius: radii.bubble,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  bubbleText: { color: colors.text },
});

export const HumanMessage = memo(HumanMessageBase);
