import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('poohmeme')
		.setDescription('Creates a Pooh meme with custom texts.')
		.addStringOption((option) =>
			option
				.setName('text1')
				.setDescription('First text for the meme.')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('text2')
				.setDescription('Second text for the meme.')
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const text1 = interaction.options.getString('text1')!;
		const text2 = interaction.options.getString('text2')!;
		const apiUrl = `https://api.popcat.xyz/pooh?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

		await interaction.deferReply();

		const embed = new EmbedBuilder()
			.setTitle('Pooh Meme')
			.setImage(apiUrl)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({ embeds: [embed] });
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
