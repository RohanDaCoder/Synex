import type { CommandOptions } from '../commands/base/Command';
import { ChatInputCommandInteraction } from 'discord.js';

export async function checkPermissions(
	interaction: ChatInputCommandInteraction,
	options: CommandOptions,
): Promise<{ allowed: boolean; missing: string[] }> {
	const missing: string[] = [];

	if (options.userPermissions) {
		const hasPermissions = interaction.memberPermissions?.has(
			options.userPermissions,
		);

		if (!hasPermissions) {
			missing.push(...options.userPermissions.map((p) => p.toString()));
		}
	}

	if (options.botPermissions) {
		const botMember = interaction.guild?.members.me;

		if (botMember) {
			for (const perm of options.botPermissions) {
				if (!botMember.permissions.has(perm)) {
					missing.push(perm.toString());
				}
			}
		}
	}

	return { allowed: missing.length === 0, missing };
}
