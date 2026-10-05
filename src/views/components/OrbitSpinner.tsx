import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../theme/tokens';
import { SparkleIcon } from './icons';

const SIZE = 84;

/** Faint ring with a rotating gold arc + dot around a static sparkle. */
export function OrbitSpinner() {
  const angle = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(withTiming(360, { duration: 1400, easing: Easing.linear }), -1, false);
  }, [angle]);

  const rotation = useAnimatedStyle(() => ({ transform: [{ rotate: `${angle.value}deg` }] }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[StyleSheet.absoluteFill, rotation]}>
        <Svg width={SIZE} height={SIZE} viewBox="0 0 84 84" fill="none">
          <Circle cx={42} cy={42} r={38} stroke="rgba(217,174,82,0.15)" strokeWidth={3} />
          <Circle
            cx={42}
            cy={42}
            r={38}
            stroke={colors.gold}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="60 1000"
          />
          <Circle cx={80} cy={42} r={3.5} fill={colors.goldLight} />
        </Svg>
      </Animated.View>
      <SparkleIcon size={26} color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
});
