import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { type Command, CommandCategory } from '@/types';
import sendMessage from '@/util/sendMessage';
import getEmoji from '@/util/getEmoji';

export default {
	data: new SlashCommandBuilder()
		.setContexts(InteractionContextType.Guild)
		.setName('wanted')
		.setDescription('Creates a wanted poster for a user.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user to create the wanted poster for.')
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('user');

		if (!user) {
			await sendMessage({
				interaction,
				message: 'Please mention a valid user to create the wanted poster.',
				color: 'Red',
				emoji: getEmoji('Failed'),
			});
			return;
		}

		await interaction.deferReply();

		const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 512 });
		const apiUrl = `https://api.popcat.xyz/wanted?image=${encodeURIComponent(avatarUrl)}`;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username} is wanted!`)
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
