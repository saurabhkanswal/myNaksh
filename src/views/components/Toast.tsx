import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii } from '../../theme/tokens';

interface Props {
  message: string | null;
}

/**
 * Top-center transient confirmation. Fades/slides in and out via a shared value;
 * auto-hide timing is driven by the controller (which clears `message`).
 */
export function Toast({ message }: Props) {
  const [current, setCurrent] = useState<string | null>(message);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (message) {
      setCurrent(message);
      progress.value = withTiming(1, { duration: 180 });
    } else {
      progress.value = withTiming(0, { duration: 180 }, finished => {
        if (finished) {
          runOnJS(setCurrent)(null);
        }
      });
    }
  }, [message, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * -8 }],
  }));

  if (!current) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.toast, animatedStyle]}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert">
      <Text style={styles.text}>{current}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 86,
    alignSelf: 'center',
    backgroundColor: colors.goldLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  text: { fontSize: 13, fontWeight: '600', color: colors.textOnGold },
});
