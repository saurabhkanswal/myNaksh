import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { SystemMessage as SystemMessageType } from '../../../models/types';
import { SparkleIcon } from '../icons';
import { MessageRowProps } from './types';

function SystemMessageBase({ message }: MessageRowProps<SystemMessageType>) {
  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        <SparkleIcon size={13} color={colors.gold} />
        <Text style={[typography.meta, styles.text]}>{message.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  text: { color: colors.textSoft },
});

export const SystemMessage = memo(SystemMessageBase);
