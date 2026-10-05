import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/tokens';
import { typography } from '../../../theme/typography';
import { DateSeparatorMessage } from '../../../models/types';
import { MessageRowProps } from './types';

function DateSeparatorBase({ message }: MessageRowProps<DateSeparatorMessage>) {
  return (
    <View style={styles.row}>
      <View style={styles.rule} />
      <Text style={[typography.dateSeparator, styles.label]}>{message.label}</Text>
      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rule: { flex: 1, height: 1, backgroundColor: colors.hairline },
  label: { color: colors.textMuted },
});

export const DateSeparator = memo(DateSeparatorBase);
