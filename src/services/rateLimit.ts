interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimitService {
  private limits: Map<string, RateLimitEntry>;

  constructor() {
    this.limits = new Map();
  }

  acquire(key: string, limit: number, window: number): boolean {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry) {
      this.limits.set(key, { count: 1, resetAt: now + window });
      return true;
    }

    if (now >= entry.resetAt) {
      entry.count = 1;
      entry.resetAt = now + window;
      return true;
    }

    if (entry.count >= limit) {
      return false;
    }

    entry.count += 1;
    return true;
  }

  getRemaining(key: string): number {
    const entry = this.limits.get(key);

    if (!entry) {
      return 0;
    }

    return Math.max(0, entry.count);
  }

  reset(key: string): void {
    this.limits.delete(key);
  }
}

export const rateLimit = new RateLimitService();
