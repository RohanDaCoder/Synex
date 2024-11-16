import {
	SlashCommandBuilder,
	InteractionContextType,
	EmbedBuilder,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import axios from 'axios';

export default {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Get a joke')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Fun,
	run: async ({ interaction }) => {
		await interaction.deferReply();

		const response = await axios.get('https://api.popcat.xyz/joke');
		const joke = response.data.joke;

		const jokeEmbed = new EmbedBuilder()
			.setTitle("Here's a joke for you!")
			.setDescription(joke)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({
			embeds: [jokeEmbed],
		});
	},
} as Command;
