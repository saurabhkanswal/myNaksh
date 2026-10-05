import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors } from '../../../theme/tokens';
import { PersonIcon } from '../icons';

/**
 * Card visuals. Paths lifted verbatim from the design mockups. Each is a
 * self-contained component (no props) so the registry can reference it directly.
 */

export const GemVisual = () => (
  <Svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1.1} strokeLinejoin="round">
    <Path d="M6 3h12l4 6-10 12L2 9z" fill={colors.sapphire} />
    <Path d="M2 9h20M12 21L8 9l4-6 4 6z" />
  </Svg>
);

export const TarotVisual = () => (
  <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1.1} strokeLinejoin="round">
    <Rect x={3} y={4.5} width={10} height={16} rx={1.5} rotation={-12} originX={8} originY={12.5} />
    <Rect x={10} y={3} width={10.5} height={17} rx={1.5} fill={colors.surface} />
    <Path d="M15.25 7.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" fill={colors.gold} stroke="none" />
    <Path d="M12.5 17.5h5.5" />
  </Svg>
);

export const AvatarVisual = () => (
  <View style={avatarStyles.circle}>
    <PersonIcon size={28} color={colors.gold} strokeWidth={1.3} />
    <View style={avatarStyles.dot} />
  </View>
);

const avatarStyles = StyleSheet.create({
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.surfaceSunken,
  },
});

export const SaturnVisual = () => (
  <Svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1}>
    <Circle cx={12} cy={12} r={4.5} fill="rgba(217,174,82,0.18)" />
    <Ellipse cx={12} cy={12} rx={10} ry={3.2} rotation={-18} originX={12} originY={12} />
  </Svg>
);

export const GiftVisual = () => (
  <Svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke={colors.textOnGold} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={3} y={8} width={18} height={13} rx={1.5} />
    <Path d="M3 12h18M12 8v13" />
    <Path d="M12 8c-1.5-3.5-6-4-6-1.5S12 8 12 8zM12 8c1.5-3.5 6-4 6-1.5S12 8 12 8z" />
  </Svg>
);

export const CalendarVisual = () => (
  <Svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1.1} strokeLinecap="round">
    <Rect x={3} y={5} width={18} height={16} rx={2} />
    <Path d="M3 10h18M8 3v4M16 3v4" />
    <Path d="M14.5 13.2a2.6 2.6 0 1 0 0 4.6 3 3 0 1 1 0-4.6z" fill={colors.gold} stroke="none" />
  </Svg>
);

export const DiyaVisual = () => (
  <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 3c1.8 2.6 3 4.2 3 6.2a3 3 0 0 1-6 0c0-2 1.2-3.6 3-6.2z" fill="rgba(217,174,82,0.35)" />
    <Path d="M3.5 14h17c-.6 3.6-4 6-8.5 6s-7.9-2.4-8.5-6z" />
    <Path d="M12 14v-2" />
  </Svg>
);

export const SparkleVisual = () => (
  <Svg width={44} height={44} viewBox="0 0 24 24" fill={colors.gold}>
    <Path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
    <Path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  </Svg>
);
