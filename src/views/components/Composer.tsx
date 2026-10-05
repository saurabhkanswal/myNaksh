import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { fonts } from '../../theme/typography';
import { ArrowUpIcon } from './icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  bottomInset?: number;
}

export function Composer({
  value,
  onChangeText,
  onSend,
  disabled,
  placeholder = 'Ask about your chart…',
  bottomInset = 0,
}: Props) {
  const [focused, setFocused] = useState(false);
  const canSend = !disabled && value.trim().length > 0;

  return (
    <View style={[styles.row, { paddingBottom: 24 + bottomInset }, disabled && styles.disabled]}>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        editable={!disabled}
        accessibilityLabel="Message"
        returnKeyType="send"
        onSubmitEditing={() => canSend && onSend()}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send message"
        accessibilityState={{ disabled: !canSend }}
        onPress={onSend}
        disabled={!canSend}
        style={[styles.sendBtn, !canSend && styles.sendDisabled]}>
        <ArrowUpIcon size={20} color={colors.textOnGold} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  disabled: { opacity: 0.45 },
  input: {
    flex: 1,
    minWidth: 0,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 18,
    fontSize: 15,
    fontFamily: fonts.body,
  },
  inputFocused: { borderColor: colors.gold },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {},
});
