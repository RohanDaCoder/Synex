interface CooldownEntry {
	count: number;
	resetAt: number;
}

export class CooldownManager {
	private cooldowns: Map<string, CooldownEntry>;

	constructor() {
		this.cooldowns = new Map();
	}

	check(userId: string, command: string, seconds: number): boolean {
		const key = `${userId}:${command}`;
		const now = Date.now();
		const entry = this.cooldowns.get(key);

		if (!entry) {
			this.cooldowns.set(key, { count: 1, resetAt: now + seconds * 1000 });
			return true;
		}

		if (now >= entry.resetAt) {
			entry.count = 1;
			entry.resetAt = now + seconds * 1000;
			return true;
		}

		if (entry.count >= seconds) {
			return false;
		}

		entry.count += 1;
		return true;
	}

	reset(userId: string, command: string): void {
		const key = `${userId}:${command}`;
		this.cooldowns.delete(key);
	}

	getRemaining(userId: string, command: string): number {
		const key = `${userId}:${command}`;
		const entry = this.cooldowns.get(key);

		if (!entry) {
			return 0;
		}

		const remaining = Math.ceil((entry.resetAt - Date.now()) / 1000);
		return remaining > 0 ? remaining : 0;
	}
}

export const cooldownManager = new CooldownManager();
