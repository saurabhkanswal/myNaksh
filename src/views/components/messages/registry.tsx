import React from 'react';
import { Message } from '../../../models/types';
import { AiMessage } from './AiMessage';
import { DateSeparator } from './DateSeparator';
import { HumanMessage } from './HumanMessage';
import { SystemMessage } from './SystemMessage';
import { UserMessage } from './UserMessage';
import { MessageRowProps } from './types';

type RowComponent = React.ComponentType<MessageRowProps<any>>;

/** Message type → row component. One component per type (DESIGN.md §2). */
const messageRegistry: Record<Message['type'], RowComponent> = {
  system: SystemMessage,
  date: DateSeparator,
  user: UserMessage,
  ai: AiMessage,
  human: HumanMessage,
};

export function renderMessageRow(props: MessageRowProps) {
  const Row = messageRegistry[props.message.type];
  return <Row {...props} />;
}
