let counter = 0;

/** Monotonic, collision-free id for optimistic messages. */
export function createId(prefix = 'm'): string {
  counter += 1;
  return `${prefix}_${Date.now()}_${counter}`;
}
