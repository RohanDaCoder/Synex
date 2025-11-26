import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { type Command, CommandCategory } from '../../types';

export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Tests Something')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		await interaction.reply('no tests available lmao :rofl:');
	},
} as Command;
