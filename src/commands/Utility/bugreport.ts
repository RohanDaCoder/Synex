import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { CommandCategory, type Command } from '../../types';
import createBugReportModal from '@/util/createBugReportModal';

export default {
	data: new SlashCommandBuilder()
		.setName('bugreport')
		.setDescription('Submit a bug report')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		const modal = createBugReportModal();
		await interaction.showModal(modal);
	},
} as Command;
