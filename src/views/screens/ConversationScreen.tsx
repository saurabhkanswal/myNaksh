import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/tokens';
import { useConversationViewModel } from '../../viewmodels/useConversationViewModel';
import { Composer } from '../components/Composer';
import { Header } from '../components/Header';
import { MessageActionSheet } from '../components/MessageActionSheet';
import { MessageList } from '../components/MessageList';
import { ReplyPreview } from '../components/ReplyPreview';
import { Toast } from '../components/Toast';
import { MessageActions } from '../components/messages/types';
import { EmptyState } from './states/EmptyState';
import { ErrorState } from './states/ErrorState';
import { LoadingState } from './states/LoadingState';

interface Props {
  onBack?: () => void;
}

function headerProps(status: string, isEmpty: boolean) {
  if (status === 'loading') {
    return { statusText: 'Connecting…', online: true } as const;
  }
  if (status === 'error') {
    return { statusText: 'Offline', statusTone: 'danger', dimmed: true, online: false } as const;
  }
  return { statusText: isEmpty ? 'Online' : 'Online · reading your chart', online: true } as const;
}

export function ConversationScreen({ onBack }: Props) {
  const vm = useConversationViewModel();
  const insets = useSafeAreaInsets();

  const actions = useMemo<MessageActions>(
    () => ({
      onLike: vm.like,
      onDislike: vm.dislike,
      onPickReason: vm.pickReason,
      onOpenSheet: vm.openSheet,
      onPressRecommendation: vm.tapRecommendation,
      onRetry: vm.retry,
    }),
    [vm.like, vm.dislike, vm.pickReason, vm.openSheet, vm.tapRecommendation, vm.retry],
  );

  const composerDisabled = vm.status === 'loading' || vm.status === 'error';

  const renderBody = () => {
    if (vm.status === 'loading') {
      return <LoadingState />;
    }
    if (vm.status === 'error') {
      return <ErrorState onRetry={vm.load} />;
    }
    if (vm.isEmpty) {
      return <EmptyState onSend={vm.send} />;
    }
    return <MessageList data={vm.groupedMessages} actions={actions} />;
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header {...headerProps(vm.status, vm.isEmpty)} onBack={onBack ?? (() => {})} onMore={() => {}} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}>
        <View style={styles.flex}>{renderBody()}</View>

        {!!vm.replyTo && vm.status !== 'error' && (
          <ReplyPreview quote={vm.replyTo} onCancel={vm.cancelReply} />
        )}

        <Composer
          value={vm.draft}
          onChangeText={vm.changeDraft}
          onSend={vm.sendDraft}
          disabled={composerDisabled}
          placeholder={vm.status === 'error' ? 'Reconnect to send messages' : undefined}
          bottomInset={insets.bottom}
        />
      </KeyboardAvoidingView>

      <MessageActionSheet
        message={vm.actionSheetMessage}
        onClose={vm.closeSheet}
        onReply={vm.reply}
        onCopy={vm.copy}
        onDelete={vm.remove}
      />

      <Toast message={vm.toast} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
});
