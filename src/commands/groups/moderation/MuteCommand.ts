import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	InteractionContextType,
} from 'discord.js';
import {
	Command,
	CommandContext,
	type CommandOptions,
} from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/sendMessage.js';

export class MuteCommand extends Command {
	readonly name = 'mute';
	readonly description = 'Mute a user in the server';
	readonly options: CommandOptions = {
		cooldown: 10,
		userPermissions: [PermissionFlagsBits.MuteMembers],
		botPermissions: [
			PermissionFlagsBits.MuteMembers,
			PermissionFlagsBits.ManageRoles,
			PermissionFlagsBits.EmbedLinks,
		],
		devOnly: false,
		group: 'moderation',
	};

	data = new SlashCommandBuilder()
		.setName(this.name)
		.setDescription(this.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.addUserOption((option) =>
			option.setName('user').setDescription('User to mute').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Mute reason').setMaxLength(512),
		);

	async execute({ interaction, guild }: CommandContext): Promise<void> {
		const user = interaction.options.getUser('user', true);
		const reason =
			interaction.options.getString('reason') ?? 'No reason provided';

		if (!guild) return;

		try {
			const member = await guild.members.fetch(user.id);

			if (member) {
				await member.timeout(60 * 1000, reason);
				await sendMessage({
					interaction,
					message: `${user.tag} has been muted\nReason: ${reason}`,
					emoji: emoji('mute'),
					color: 'Yellow',
				});
			} else {
				await sendMessage({
					interaction,
					message: 'User not found in server',
					emoji: emoji('failed'),
					color: 'Red',
				});
			}
		} catch (error) {
			await sendMessage({
				interaction,
				message: `Failed to mute user: ${(error as Error).message}`,
				emoji: emoji('failed'),
				color: 'Red',
			});
		}
	}
}
