import {
	SlashCommandBuilder,
	InteractionContextType,
	EmbedBuilder,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import axios from 'axios';

export default {
	data: new SlashCommandBuilder()
		.setName('pickup-line')
		.setDescription('Get a random pickup line.')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Fun,
	run: async ({ interaction }) => {
		await interaction.deferReply();

		const apiUrl = 'https://api.popcat.xyz/pickuplines';
		const response = await axios.get(apiUrl);
		const pickupLine = response.data.pickupline;

		const embed = new EmbedBuilder()
			.setTitle("Here's a pickup line for you!")
			.setDescription(pickupLine)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({
			embeds: [embed],
		});
	},
} as Command;
