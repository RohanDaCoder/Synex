import { Events, type Interaction } from 'discord.js';
import config from '../../config';
import type { Event } from '../../types';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
		if (!interaction.guild) return;
		interaction.reply({ content: `${config.emojis.Failed} Hi` });
	},
} as Event<Events.InteractionCreate>;
