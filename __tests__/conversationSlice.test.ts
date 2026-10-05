import reducer, {
  addMessage,
  loadFailed,
  removeMessage,
  setFeedback,
  setFeedbackReason,
  setMessages,
  updateMessageStatus,
} from '../src/models/store/conversationSlice';
import { AiMessage, Message, UserMessage } from '../src/models/types';

const initial = reducer(undefined, { type: '@@init' });

const userMsg: UserMessage = { id: 'u1', type: 'user', text: 'hi', status: 'sending', timestamp: 0 };
const aiMsg: AiMessage = { id: 'a1', type: 'ai', text: 'reply', timestamp: 0, feedback: { value: null } };

describe('conversationSlice', () => {
  it('setMessages marks the conversation loaded', () => {
    const next = reducer(initial, setMessages([userMsg]));
    expect(next.status).toBe('loaded');
    expect(next.messages).toHaveLength(1);
  });

  it('loadFailed captures the error', () => {
    const next = reducer(initial, loadFailed('boom'));
    expect(next.status).toBe('error');
    expect(next.error).toBe('boom');
  });

  it('updateMessageStatus transitions a user message', () => {
    const loaded = reducer(initial, setMessages([userMsg]));
    const next = reducer(loaded, updateMessageStatus({ id: 'u1', status: 'sent' }));
    expect((next.messages[0] as UserMessage).status).toBe('sent');
  });

  it('addMessage appends and removeMessage deletes', () => {
    const added = reducer(initial, addMessage(userMsg as Message));
    expect(added.messages).toHaveLength(1);
    const removed = reducer(added, removeMessage('u1'));
    expect(removed.messages).toHaveLength(0);
  });

  it('stores feedback value and reason on an AI message', () => {
    const loaded = reducer(initial, setMessages([aiMsg]));
    const liked = reducer(loaded, setFeedback({ id: 'a1', value: 'dislike' }));
    expect((liked.messages[0] as AiMessage).feedback.value).toBe('dislike');
    const reasoned = reducer(liked, setFeedbackReason({ id: 'a1', reason: 'Too Long' }));
    expect((reasoned.messages[0] as AiMessage).feedback.reason).toBe('Too Long');
  });
});
