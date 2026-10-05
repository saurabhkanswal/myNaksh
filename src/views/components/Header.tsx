import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { typography } from '../../theme/typography';
import { ChevronLeftIcon, MoreVerticalIcon, SparkleIcon } from './icons';

interface Props {
  statusText: string;
  statusTone?: 'normal' | 'danger';
  dimmed?: boolean;
  online?: boolean;
  onBack: () => void;
  onMore: () => void;
}

export function Header({ statusText, statusTone = 'normal', dimmed, online = true, onBack, onMore }: Props) {
  return (
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={styles.iconBtn}>
        <ChevronLeftIcon size={22} color={colors.text} />
      </Pressable>

      <View style={[styles.avatar, dimmed && styles.dimmed]}>
        <SparkleIcon size={20} color={colors.gold} />
        {online && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.name} numberOfLines={1}>
          AI Astrologer
        </Text>
        <Text
          style={[styles.status, statusTone === 'danger' && styles.statusDanger]}
          numberOfLines={1}>
          {statusText}
        </Text>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="More options" onPress={onMore} style={styles.iconBtn}>
        <MoreVerticalIcon size={20} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 18,
    paddingBottom: 14,
    paddingLeft: 6,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    backgroundColor: colors.bg,
  },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimmed: { opacity: 0.5 },
  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.bg,
  },
  titleBlock: { flex: 1, minWidth: 0 },
  name: { ...typography.headerName, color: colors.text },
  status: { ...typography.meta, color: colors.textMuted },
  statusDanger: { color: colors.dangerText },
});
