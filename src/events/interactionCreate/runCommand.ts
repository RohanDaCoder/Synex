import { Events, type ChatInputCommandInteraction } from 'discord.js';
import config from '../../config';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.isCommand()) return;
		if (!interaction.guild) return;
		interaction.reply({ content: `${config.emojis.Failed} Hi` });
	},
};
