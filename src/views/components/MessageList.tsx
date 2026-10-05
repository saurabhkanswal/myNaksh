import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { spacing } from '../../theme/tokens';
import { GroupedMessage } from '../../models/types';
import { renderMessageRow } from './messages/registry';
import { MessageActions } from './messages/types';

interface Props {
  data: GroupedMessage[];
  actions: MessageActions;
}

/** Scrolling list of messages. Keeps grouping-aware spacing between rows. */
export function MessageList({ data, actions }: Props) {
  const listRef = useRef<FlatList<GroupedMessage>>(null);

  const renderItem = useCallback<ListRenderItem<GroupedMessage>>(
    ({ item }) =>
      renderMessageRow({
        message: item.message,
        isLastInGroup: item.isLastInGroup,
        actions,
      }),
    [actions],
  );

  const Separator = useCallback(
    ({ leadingItem }: { leadingItem: GroupedMessage }) => (
      <View style={{ height: leadingItem.isLastInGroup ? spacing.lg : spacing.xs }} />
    ),
    [],
  );

  const scrollToEnd = useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={item => item.message.id}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={scrollToEnd}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: 18,
    paddingBottom: 20,
  },
});
