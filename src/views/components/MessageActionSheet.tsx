import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, radii } from '../../theme/tokens';
import { typography } from '../../theme/typography';
import { Message } from '../../models/types';
import { CopyIcon, ReplyIcon, TrashIcon } from './icons';

interface Props {
  message: Message | undefined;
  onClose: () => void;
  onReply: (message: Message) => void;
  onCopy: (message: Message) => void;
  onDelete: (id: string) => void;
}

function textOf(message: Message): string {
  return 'text' in message ? message.text : '';
}

/**
 * Bottom-aligned action sheet opened by long-press or the ⋯ button. Driven by a
 * single shared value (backdrop fade + sheet slide-up) so it stays mounted long
 * enough to play its exit before unmounting.
 */
export function MessageActionSheet({ message, onClose, onReply, onCopy, onDelete }: Props) {
  // Keep the last message around while animating out.
  const [current, setCurrent] = useState<Message | undefined>(message);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (message) {
      setCurrent(message);
      progress.value = withTiming(1, { duration: 180 });
    } else {
      progress.value = withTiming(0, { duration: 160 }, finished => {
        if (finished) {
          runOnJS(setCurrent)(undefined);
        }
      });
    }
  }, [message, progress]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const sheetStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 48 }],
  }));

  if (!current) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Close message options"
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View style={[styles.sheet, sheetStyle]} pointerEvents="box-none">
        <View style={styles.lifted}>
          <Text style={[typography.messageBody, styles.liftedText]}>{textOf(current)}</Text>
        </View>

        <View style={styles.menu}>
          <Pressable style={styles.menuRow} onPress={() => onReply(current)} accessibilityRole="button">
            <ReplyIcon size={20} color={colors.gold} />
            <Text style={styles.menuLabel}>Reply</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.menuRow} onPress={() => onCopy(current)} accessibilityRole="button">
            <CopyIcon size={20} color={colors.gold} />
            <Text style={styles.menuLabel}>Copy text</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.menuRow} onPress={() => onDelete(current.id)} accessibilityRole="button">
            <TrashIcon size={20} color={colors.dangerText} />
            <Text style={[styles.menuLabel, styles.deleteLabel]}>Delete</Text>
          </Pressable>
        </View>

        <Pressable style={styles.cancel} onPress={onClose} accessibilityRole="button" accessibilityLabel="Cancel">
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: colors.scrim },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingBottom: 28,
    gap: 12,
  },
  lifted: {
    alignSelf: 'flex-start',
    maxWidth: '86%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.gold,
    borderTopLeftRadius: radii.bubbleTail,
    borderTopRightRadius: radii.bubble,
    borderBottomLeftRadius: radii.bubble,
    borderBottomRightRadius: radii.bubble,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  liftedText: { color: colors.text },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: radii.sheet,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
  },
  menuLabel: { fontSize: 15, fontWeight: '500', color: colors.text },
  deleteLabel: { color: colors.dangerText },
  divider: { height: 1, backgroundColor: colors.hairline, marginLeft: 52 },
  cancel: {
    height: 52,
    borderRadius: radii.button,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: { fontSize: 15, fontWeight: '600', color: colors.text },
});
