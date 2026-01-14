import type { Config } from './schema';

function getEnv(key: string, required: boolean): string | undefined {
	const value = process.env[key];

	if (required && !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}

	return value;
}

function parseIds(value: string | undefined): readonly string[] {
	if (!value) {
		return [];
	}

	return value
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);
}

export function loadConfig(): Config {
	return {
		env: (getEnv('NODE_ENV', false) ?? 'development') as Config['env'],
		debug: getEnv('DEBUG', false) === 'true',
		discord: {
			token: getEnv('DISCORD_TOKEN', true)!,
			applicationId: getEnv('DISCORD_APP_ID', true)!,
		},
		developer: {
			guildIds: parseIds(getEnv('DEV_GUILD_IDS', false)),
			userIds: parseIds(getEnv('DEV_USER_IDS', false)),
		},
		logging: {
			usageLogChannelId: getEnv('USAGE_LOG_CHANNEL_ID', false) ?? '',
		},
	};
}

export function validateConfig(_config: Config): void {
	if (!_config.discord.token) {
		throw new Error('DISCORD_TOKEN is required');
	}

	if (!_config.discord.applicationId) {
		throw new Error('DISCORD_APP_ID is required');
	}
}

export const config = loadConfig();
export type { Config };
export { getEnv, parseIds };
