import React from 'react';
import {
  AvatarVisual,
  CalendarVisual,
  DiyaVisual,
  GemVisual,
  GiftVisual,
  SaturnVisual,
  SparkleVisual,
  TarotVisual,
} from './visuals';

export type RecommendationVariant = 'default' | 'highlight' | 'fallback';

export interface RecommendationConfig {
  tag: string;
  cta: string;
  Visual: React.ComponentType;
  variant?: RecommendationVariant;
  defaultSubtitle?: string;
}

/**
 * Type → config. Adding a new recommendation type is one entry + one Visual;
 * nothing else in the app needs to change. (DESIGN.md §4.)
 */
export const recommendationRegistry: Record<string, RecommendationConfig> = {
  gemstone: { tag: 'Gemstone', cta: 'View stone', Visual: GemVisual },
  tarot: { tag: 'Tarot', cta: 'Draw cards', Visual: TarotVisual, defaultSubtitle: 'A three-card spread' },
  consultation: { tag: 'Consultation', cta: 'Connect', Visual: AvatarVisual, defaultSubtitle: 'Live chat or call' },
  article: { tag: 'Article', cta: 'Read', Visual: SaturnVisual, defaultSubtitle: 'Vedic basics' },
  promotion: { tag: 'Offer', cta: 'Claim offer', Visual: GiftVisual, variant: 'highlight' },
  panchang: { tag: 'Panchang', cta: 'View day', Visual: CalendarVisual },
  remedy: { tag: 'Remedy', cta: 'See steps', Visual: DiyaVisual },
};

/** Unknown API types render this instead of crashing. */
export const fallbackConfig: RecommendationConfig = {
  tag: 'For you',
  cta: 'Open',
  Visual: SparkleVisual,
  variant: 'fallback',
};

export function resolveRecommendation(type: string): RecommendationConfig {
  return recommendationRegistry[type] ?? fallbackConfig;
}
