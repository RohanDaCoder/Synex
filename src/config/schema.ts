export interface Config {
	env: 'development' | 'production' | 'test';
	debug: boolean;
	discord: {
		token: string;
		applicationId: string;
	};
	developer: {
		guildIds: readonly string[];
		userIds: readonly string[];
	};
	logging: {
		usageLogChannelId: string;
	};
}

export type ConfigType = Config;
