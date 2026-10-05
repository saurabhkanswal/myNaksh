import { Platform, TextStyle } from 'react-native';

/**
 * Centralized typography. The design calls for Cormorant Garamond (display) and
 * DM Sans (body). We use system-font fallbacks here so the build needs no TTF
 * linking — this is the single place to swap in bundled fonts later.
 */
const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });
const sans = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' });

export const fonts = {
  // Display / names / card titles → Cormorant Garamond 600
  display: serif,
  // Body / UI → DM Sans
  body: sans,
} as const;

type Variant =
  | 'headerName'
  | 'stateTitle'
  | 'cardTitle'
  | 'messageBody'
  | 'meta'
  | 'eyebrow'
  | 'dateSeparator';

export const typography: Record<Variant, TextStyle> = {
  headerName: { fontFamily: fonts.display, fontWeight: '600', fontSize: 23, lineHeight: 25 },
  stateTitle: { fontFamily: fonts.display, fontWeight: '600', fontSize: 32, lineHeight: 36 },
  cardTitle: { fontFamily: fonts.display, fontWeight: '600', fontSize: 20, lineHeight: 22 },
  messageBody: { fontFamily: fonts.body, fontWeight: '400', fontSize: 15, lineHeight: 22 },
  meta: { fontFamily: fonts.body, fontWeight: '400', fontSize: 12, lineHeight: 16 },
  eyebrow: {
    fontFamily: fonts.body,
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  dateSeparator: {
    fontFamily: fonts.body,
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
};
