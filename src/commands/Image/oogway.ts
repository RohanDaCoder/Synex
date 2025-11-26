import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { type Command, CommandCategory } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('oogway')
		.setContexts(InteractionContextType.Guild)

		.setDescription('Get a wisdom quote from Master Oogway.')
		.addStringOption((option) =>
			option
				.setName('text')
				.setDescription('Customize the quote with additional text.')
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const text = encodeURIComponent(interaction.options.getString('text')!);
		const apiUrl = `https://api.popcat.xyz/oogway?text=${text}`;

		const embed = new EmbedBuilder()
			.setTitle("Master Oogway's Wisdom")
			.setColor('#FFD700')
			.setImage(apiUrl)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
