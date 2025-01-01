import { ChatInputCommandInteraction, Events } from 'discord.js';
import type { Event } from '../../types';
import client from '../..';
import sendMessage from '../../utils/sendMessage';
import Commands from '../../commands/commands';
import config, { Emojis } from '../../config';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.isCommand()) return;
		if (!interaction.guild)
			return sendMessage({
				interaction,
				message: 'You can only use my commands in a server.',
				emoji: Emojis.Failed,
			});

		if (!interaction.member)
			return sendMessage({
				interaction,
				message: 'Something went wrong...',
				emoji: Emojis.Failed,
			});
		const command = Commands.allCommands.find(
			(cmd) => cmd.data.name === interaction.commandName,
		);
		if (!interaction.guild) {
			return sendMessage({
				message: 'This command can only be used in a server (guild).',
				interaction,
				emoji: Emojis.Failed,
			});
		}
		if (!command) {
			return sendMessage({
				message: 'This Command Does Not Exist!',
				interaction,
				emoji: Emojis.Failed,
			});
		}

		if (
			Commands.devCommands.includes(command) &&
			!config.devUserIds.includes(interaction.user.id)
		) {
			return sendMessage({
				message: 'This Command Is Only For Developers!',
				interaction,
				emoji: Emojis.Failed,
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
						emoji: Emojis.Failed,
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
						emoji: Emojis.Failed,
					});
				}
			}
		}

		try {
			await command.run({ interaction, client });
		} catch (error: any) {
			console.error(error);
			await sendMessage({
				message: `There was an error while executing this command! \n\nError: \`${error.message}\``,
				interaction,
				emoji: Emojis.Failed,
			});
		}
	},
} as Event;
