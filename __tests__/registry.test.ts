import {
  fallbackConfig,
  recommendationRegistry,
  resolveRecommendation,
} from '../src/views/components/recommendations/registry';

describe('recommendation registry', () => {
  it('resolves a known type to its config', () => {
    expect(resolveRecommendation('gemstone')).toBe(recommendationRegistry.gemstone);
  });

  it('falls back for an unknown type instead of crashing', () => {
    expect(resolveRecommendation('horoscope-9000')).toBe(fallbackConfig);
  });

  it('marks promotion as the highlight variant', () => {
    expect(recommendationRegistry.promotion.variant).toBe('highlight');
  });
});
