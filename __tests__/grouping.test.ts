import { groupMessages } from '../src/utils/grouping';
import { Message } from '../src/models/types';

const user = (id: string): Message => ({ id, type: 'user', text: id, status: 'sent', timestamp: 0 });
const ai = (id: string): Message => ({ id, type: 'ai', text: id, timestamp: 0, feedback: { value: null } });
const system = (id: string): Message => ({ id, type: 'system', text: id, timestamp: 0 });

describe('groupMessages', () => {
  it('marks only the last message of a same-sender run as last in group', () => {
    const result = groupMessages([user('a'), user('b'), ai('c')]);
    expect(result.map(r => r.isLastInGroup)).toEqual([false, true, true]);
  });

  it('treats system/date messages as standalone groups', () => {
    const result = groupMessages([system('s'), user('a')]);
    expect(result.every(r => r.isLastInGroup)).toBe(true);
  });

  it('breaks a group when the sender changes', () => {
    const result = groupMessages([user('a'), ai('b'), user('c')]);
    expect(result.map(r => r.isLastInGroup)).toEqual([true, true, true]);
  });
});
