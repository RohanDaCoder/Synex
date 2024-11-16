import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setContexts(InteractionContextType.Guild)
		.setName('sadcat')
		.setDescription('Creates a sad cat meme with custom text.')
		.addStringOption((option) =>
			option
				.setName('text')
				.setDescription('Custom text for the sad cat meme.')
				.setRequired(true),
		)
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const text = interaction.options.getString('text')!;

		await interaction.deferReply();

		const apiUrl = `https://api.popcat.xyz/sadcat?text=${encodeURIComponent(text)}`;

		const embed = new EmbedBuilder()
			.setTitle('Sad Cat Meme')
			.setImage(apiUrl)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({
			embeds: [embed],
		});
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
