import type { CommandOptions } from '../commands/base/Command';
import { ChatInputCommandInteraction } from 'discord.js';

export function validateOptions(
	_interaction: ChatInputCommandInteraction,
	_schema: CommandOptions,
): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	return { valid: errors.length === 0, errors };
}
