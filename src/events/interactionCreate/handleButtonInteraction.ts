import { Events, type Interaction } from 'discord.js';
import type { Event } from '../../types';
import createBugReportModal from '@/util/createBugReportModal';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		if (!interaction.isButton()) return;

		if (interaction.customId !== 'open_bug_report_modal') return;

		const modal = createBugReportModal();
		await interaction.showModal(modal);
	},
} as Event<Events.InteractionCreate>;
