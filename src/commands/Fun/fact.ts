import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import axios from 'axios';
import { Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setContexts(InteractionContextType.Guild)
		.setName('fact')
		.setDescription('Tells a random fact.'),
	category: CommandCategory.Fun,
	run: async ({ interaction }) => {
		await interaction.deferReply();

		const response = await axios.get('https://api.popcat.xyz/fact');
		const fact = response.data.fact;

		const embed = new EmbedBuilder()
			.setTitle('Random Fact')
			.setDescription(fact)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({
			embeds: [embed],
		});
	},
} as Command;
