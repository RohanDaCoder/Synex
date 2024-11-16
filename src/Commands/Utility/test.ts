import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '../../types';
import updateServerStats from '@/utils/updateServerStats';

export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Tests Server Stats')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		await updateServerStats(interaction.guild!);
	},
} as Command;
