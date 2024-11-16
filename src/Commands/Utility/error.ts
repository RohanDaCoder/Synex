import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '../../types';

export default {
	data: new SlashCommandBuilder()
		.setName('error')
		.setDescription('Get a test error')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Utility,
	run: async () => {
		throw new Error('Just an test Error');
	},
} as Command;
