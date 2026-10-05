import React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { colors } from '../../../theme/tokens';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/** Shared wrapper for line icons (fill none, stroke = color). */
function LineIcon({
  size = 22,
  color = colors.text,
  strokeWidth = 1.8,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </Svg>
  );
}

export const ChevronLeftIcon = (p: IconProps) => (
  <LineIcon {...p}>
    <Path d="M15 18l-6-6 6-6" />
  </LineIcon>
);

export const MoreVerticalIcon = ({ size = 20, color = colors.textMuted }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx={12} cy={5} r={1.6} />
    <Circle cx={12} cy={12} r={1.6} />
    <Circle cx={12} cy={19} r={1.6} />
  </Svg>
);

export const MoreHorizontalIcon = ({ size = 20, color = colors.textMuted }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx={5} cy={12} r={1.6} />
    <Circle cx={12} cy={12} r={1.6} />
    <Circle cx={19} cy={12} r={1.6} />
  </Svg>
);

/** Brand 4-point sparkle (optionally with a small second sparkle). */
export const SparkleIcon = ({ size = 20, color = colors.gold, twin = false }: IconProps & { twin?: boolean }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
    {twin && <Path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />}
  </Svg>
);

export const ThumbUpIcon = ({ size = 17, color = colors.textMuted, strokeWidth = 1.7, filled = false }: IconProps & { filled?: boolean }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'rgba(217,174,82,0.35)' : 'none'} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M7 10v11H3.5V10z" />
    <Path d="M7 10l4-7c1.2 0 2 .9 2 2v4h5.6a2 2 0 0 1 2 2.3l-1.2 7.2a2 2 0 0 1-2 1.5H7" />
  </Svg>
);

export const ThumbDownIcon = ({ size = 17, color = colors.textMuted, strokeWidth = 1.7, filled = false }: IconProps & { filled?: boolean }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'rgba(232,128,106,0.3)' : 'none'} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <G rotation={180} origin="12, 12">
      <Path d="M7 10v11H3.5V10z" />
      <Path d="M7 10l4-7c1.2 0 2 .9 2 2v4h5.6a2 2 0 0 1 2 2.3l-1.2 7.2a2 2 0 0 1-2 1.5H7" />
    </G>
  </Svg>
);

export const ReplyIcon = (p: IconProps) => (
  <LineIcon {...p}>
    <Path d="M9 14L4 9l5-5" />
    <Path d="M4 9h10a6 6 0 0 1 6 6v5" />
  </LineIcon>
);

export const CopyIcon = (p: IconProps) => (
  <LineIcon {...p}>
    <Rect x={9} y={9} width={12} height={12} rx={2} />
    <Path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </LineIcon>
);

export const TrashIcon = (p: IconProps) => (
  <LineIcon {...p}>
    <Path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </LineIcon>
);

export const CloseIcon = (p: IconProps) => (
  <LineIcon strokeWidth={2} {...p}>
    <Path d="M6 6l12 12M18 6L6 18" />
  </LineIcon>
);

export const ClockIcon = (p: IconProps) => (
  <LineIcon strokeWidth={2} {...p}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M12 7v5l3 2" />
  </LineIcon>
);

export const CheckCheckIcon = ({ size = 15, color = colors.gold }: IconProps) => (
  <LineIcon size={size} color={color} strokeWidth={2}>
    <Path d="M2 12l5 5L17 7" />
    <Path d="M12 16l1 1 9-10" />
  </LineIcon>
);

export const AlertCircleIcon = (p: IconProps) => (
  <LineIcon strokeWidth={2} {...p}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M12 7.5v5.5M12 16.5v.5" />
  </LineIcon>
);

export const RotateCwIcon = (p: IconProps) => (
  <LineIcon strokeWidth={2} {...p}>
    <Path d="M20 11a8 8 0 1 0-2.3 5.7" />
    <Path d="M20 4v7h-7" />
  </LineIcon>
);

export const ArrowUpIcon = ({ size = 20, color = colors.textOnGold }: IconProps) => (
  <LineIcon size={size} color={color} strokeWidth={2.2}>
    <Path d="M12 19V5M5 12l7-7 7 7" />
  </LineIcon>
);

export const ArrowRightIcon = ({ size = 14, color = colors.goldLight }: IconProps) => (
  <LineIcon size={size} color={color} strokeWidth={2}>
    <Path d="M5 12h14M13 6l6 6-6 6" />
  </LineIcon>
);

export const PersonIcon = ({ size = 15, color = colors.goldLight, strokeWidth = 1.7 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
    <Circle cx={12} cy={9} r={3.5} />
    <Path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </Svg>
);
