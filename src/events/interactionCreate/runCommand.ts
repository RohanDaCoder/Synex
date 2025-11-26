import { Events, type Interaction } from 'discord.js';
import config from '../../config';
import type { Event } from '../../types';
import sendMessage from '@/util/sendMessage';
import commands from '@/commands/commands';
import client from '@/index';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		// Checks
		if (!interaction.isChatInputCommand()) return;
		if (!interaction.guild)
			return sendMessage({
				interaction,
				message: 'You can only use my commands in a server.',
				emoji: config.emojis.Failed,
			});
		if (!interaction.member)
			return sendMessage({
				interaction,
				message: 'Something went wrong...',
				emoji: config.emojis.Failed,
			});

		// even more check LMAO
		const command = commands.allCommands.find(
			(cmd) => cmd.data.name === interaction.commandName,
		);

		if (!command) {
			return sendMessage({
				message: 'This Command Does Not Exist!',
				interaction,
				emoji: config.emojis.Failed,
			});
		}
		if (
			commands.devCommands.includes(command) &&
			!config.devUserIds.includes(interaction.user.id)
		) {
			return sendMessage({
				message: 'This Command Is Only For Developers!',
				interaction,
				emoji: config.emojis.Failed,
			});
		}

		if (command.options) {
			const { userPermissions, botPermissions } = command.options;

			if (userPermissions) {
				const member = await interaction.guild.members.fetch(
					interaction.user.id,
				);
				const missingUserPermissions = Array.isArray(userPermissions)
					? userPermissions.filter((perm) => !member.permissions.has(perm))
					: !member.permissions.has(userPermissions)
						? [userPermissions]
						: [];

				if (missingUserPermissions.length > 0) {
					return sendMessage({
						message: `You are missing the following permissions to execute this command: ${missingUserPermissions
							.map((perm) => `\`${perm}\``)
							.join(', ')}`,
						interaction,
						emoji: config.emojis.Failed,
					});
				}
			}

			if (botPermissions) {
				const botMember = await interaction.guild.members.fetchMe();
				const missingBotPermissions = Array.isArray(botPermissions)
					? botPermissions.filter((perm) => !botMember.permissions.has(perm))
					: !botMember.permissions.has(botPermissions)
						? [botPermissions]
						: [];

				if (missingBotPermissions.length > 0) {
					return sendMessage({
						message: `I am missing the following permissions to execute this command: ${missingBotPermissions
							.map((perm) => `\`${perm}\``)
							.join(', ')}`,
						interaction,
						emoji: config.emojis.Failed,
					});
				}
			}
		}
		// FINALLY EXECUTE
		try {
			await command.run({ interaction, client });
		} catch (error: any) {
			console.error(error);
			await sendMessage({
				message: `There was an error while executing this command! \n\nError: \`${error.message}\``,
				interaction,
				emoji: config.emojis.Failed,
			});
		}
	},
} as Event<Events.InteractionCreate>;
