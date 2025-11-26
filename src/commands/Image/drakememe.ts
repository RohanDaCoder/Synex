import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { type Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('drake')
		.setContexts(InteractionContextType.Guild)
		.setDescription('Generate a Drake meme.')
		.addStringOption((option) =>
			option
				.setName('disagree')
				.setDescription("The text for the 'disagree' part of the meme")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('agree')
				.setDescription("The text for the 'agree' part of the meme")
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const disagree = interaction.options.getString('disagree')!;
		const agree = interaction.options.getString('agree')!;

		await interaction.deferReply();
		const imageUrl = `https://api.popcat.xyz/drake?text1=${encodeURIComponent(disagree)}&text2=${encodeURIComponent(agree)}`;

		const embed = new EmbedBuilder()
			.setTitle('Drake Meme')
			.setImage(imageUrl)
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
