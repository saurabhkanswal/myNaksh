import { DELIVER_DELAY_MS, LOAD_DELAY_MS } from '../../utils/constants';
import { Message, SendStatus } from '../types';
import { createSeedMessages } from './seed';

/**
 * Simulated backend. Pure async with no knowledge of Redux or React — the only
 * boundary that owns "network" latency and success/failure outcomes. Swap these
 * implementations for real API calls without touching any other layer.
 */

/** Flip to true to exercise the Error screen on load. */
export const SIMULATE_LOAD_ERROR = false;

/** Alternating failure, mirroring the mockup's `count % 2` behavior. */
let deliverCount = 0;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const conversationService = {
  async loadConversation(): Promise<Message[]> {
    await delay(LOAD_DELAY_MS);
    if (SIMULATE_LOAD_ERROR) {
      throw new Error('Failed to connect');
    }
    return createSeedMessages();
  },

  /** Resolves after a round-trip to the final delivery status. */
  async deliverMessage(): Promise<Extract<SendStatus, 'sent' | 'failed'>> {
    await delay(DELIVER_DELAY_MS);
    deliverCount += 1;
    return deliverCount % 2 === 0 ? 'failed' : 'sent';
  },

  /** A retry always succeeds (matches the mockup). */
  async retryDelivery(): Promise<'sent'> {
    await delay(DELIVER_DELAY_MS);
    return 'sent';
  },
};
