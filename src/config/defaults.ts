export const defaults = {
	env: 'development' as const,
	logging: {
		level: 'info' as const,
		webhookEnabled: false,
		timestampFormat: 'ISO',
	},
	developer: {
		guildIds: [] as readonly string[],
		userIds: [] as readonly string[],
	},
};
