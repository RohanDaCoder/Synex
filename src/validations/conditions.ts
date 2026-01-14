import { config } from '../config';
import { ChatInputCommandInteraction } from 'discord.js';

export function isDeveloper(userId: string): boolean {
	return config.developer.userIds.includes(userId);
}

export function isDeveloperGuild(guildId: string): boolean {
	return config.developer.guildIds.includes(guildId);
}

export function isGuildOnly(interaction: ChatInputCommandInteraction): boolean {
	return interaction.inGuild();
}

export function isDevMode(): boolean {
	return config.env === 'development';
}
