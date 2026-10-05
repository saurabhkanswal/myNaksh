/**
 * Design tokens — dark-only "black & gold" theme.
 * Source of truth: mynaksh-design-handoff/DESIGN.md §1.
 */

export const colors = {
  bg: '#0F0C08', // screen background
  surface: '#1A150E', // AI bubble, cards, inputs, sheets
  surfaceSunken: '#130F09', // card visual area
  surfaceRaised: '#241D13', // human-astrologer bubble, Cancel button
  surfaceMuted: '#15110B', // system pill, reply bar, feedback panel
  gold: '#D9AE52', // primary accent, user bubble, send button
  goldLight: '#F2DDA4', // CTAs on cards, toast, human-astrologer accents
  goldDeep: '#C99C40', // promotion card visual area
  text: '#F4ECDC',
  textMuted: '#A99C82', // timestamps, subtitles, labels
  textSoft: '#CBBE9F', // system event text
  textOnGold: '#1A1206',
  textOnGoldMuted: '#3A2A0C',
  placeholder: '#8E8169',
  danger: '#E8806A',
  dangerText: '#F2A08C',
  online: '#7FCB8E',
  sapphire: 'rgba(74,111,209,0.45)', // gemstone fill
  hairline: 'rgba(217,174,82,0.16)', // dividers, header border
  border: 'rgba(217,174,82,0.22)', // card / pill borders
  scrim: 'rgba(6,4,2,0.74)', // action sheet backdrop

  // Composite tokens referenced across components
  likeOnBg: 'rgba(217,174,82,0.16)',
  dislikeOnBg: 'rgba(232,128,106,0.14)',
  dislikePanelBorder: 'rgba(232,128,106,0.28)',
  dangerBorderStrong: 'rgba(232,128,106,0.5)',
  humanBorder: 'rgba(242,221,164,0.3)',
  humanAvatarBg: '#2B2216',
  chipBorder: 'rgba(217,174,82,0.3)',
  fallbackBorder: 'rgba(217,174,82,0.45)',
  quoteBg: 'rgba(26,18,6,0.12)',
} as const;

export const radii = {
  bubble: 18,
  bubbleTail: 6,
  card: 16,
  sheet: 20,
  pill: 999,
  chip: 20,
  button: 16,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;
