import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme/tokens';

interface Props {
  style?: StyleProp<ViewStyle>;
  /** Visual tint; defaults to the surface color. */
  tone?: string;
}

/** Pulsing placeholder block (opacity 0.55 ↔ 1 over 1.6s). */
export function Skeleton({ style, tone = colors.surface }: Props) {
  const opacity = useSharedValue(0.55);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[{ backgroundColor: tone }, style, animatedStyle]} />;
}
