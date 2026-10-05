import { Message } from '../types';

/**
 * Seed conversation mirroring Main.dc.html: a date separator, a system pill,
 * the user's opening question, the AI reply with a recommendation carousel +
 * feedback, and the human-astrologer follow-up.
 */
export function createSeedMessages(): Message[] {
  // Fixed clock offsets so timestamps read like the mockup regardless of "now".
  const base = new Date();
  base.setHours(10, 42, 0, 0);
  const at = (addMinutes: number) => base.getTime() + addMinutes * 60_000;

  return [
    { id: 's1', type: 'date', label: 'Today', timestamp: at(0) },
    {
      id: 's2',
      type: 'system',
      text: 'Your session with AI Astrologer has started.',
      timestamp: at(0),
    },
    {
      id: 's3',
      type: 'user',
      text: 'Can you tell me about my career this year?',
      status: 'sent',
      timestamp: at(0),
    },
    {
      id: 's4',
      type: 'ai',
      text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
      timestamp: at(0),
      feedback: { value: null },
      recommendations: [
        { id: 'r1', type: 'gemstone', title: 'Blue Sapphire', subtitle: 'Recommended for Saturn' },
        { id: 'r2', type: 'tarot', title: 'Career Tarot Reading', subtitle: 'A three-card spread' },
        { id: 'r3', type: 'consultation', title: 'Talk to an Astrologer', subtitle: 'Live chat or call' },
        { id: 'r4', type: 'article', title: 'Understanding Saturn Mahadasha', subtitle: 'Vedic basics' },
      ],
    },
    {
      id: 's5',
      type: 'human',
      text: 'I also recommend focusing on your upcoming Jupiter transit.',
      timestamp: at(2),
    },
  ];
}
