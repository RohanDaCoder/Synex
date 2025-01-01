import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('bidenpost')
		.setContexts(InteractionContextType.Guild)
		.setDescription('Make Biden Post Something On Twitter With A Custom Text')
		.addStringOption((option) =>
			option
				.setName('text')
				.setDescription('Text for the Biden Twitter post meme.')
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const text = interaction.options.getString('text')!;
		const apiUrl = `https://api.popcat.xyz/biden?text=${encodeURIComponent(text)}`;

		const embed = new EmbedBuilder()
			.setTitle('Biden Twitter Post Meme')
			.setImage(apiUrl)
			.setColor('Random')
			.setTimestamp();

		await interaction.reply({
			embeds: [embed],
		});
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
