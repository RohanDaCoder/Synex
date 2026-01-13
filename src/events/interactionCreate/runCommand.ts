import { Events, type Interaction } from 'discord.js';
import type { Event } from '../../types';
import { globalCommandHandler, devCommandHandler } from '@/index';
import sendMessage from '@/util/sendMessage';
import config from '@/config';
import getEmoji from '@/util/getEmoji';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;

		const globalCommand = globalCommandHandler.getCommand(
			interaction.commandName,
		);

		if (globalCommand) {
			await globalCommandHandler.executeCommand(interaction);
			return;
		}

		const devCommand = devCommandHandler.getCommand(interaction.commandName);

		if (devCommand) {
			if (!config.devUserIds.includes(interaction.user.id)) {
				return sendMessage({
					message: 'This Command Is Only For Developers!',
					interaction,
					emoji: getEmoji('Failed'),
				});
			}

			await devCommandHandler.executeCommand(interaction);
			return;
		}

		return sendMessage({
			message: 'This Command Does Not Exist!',
			interaction,
			emoji: getEmoji('Failed'),
		});
	},
} as Event<Events.InteractionCreate>;
