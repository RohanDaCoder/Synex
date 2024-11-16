import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setContexts(InteractionContextType.Guild)
		.setName('mnm')
		.setDescription("Creates an M&M meme with a user's avatar.")
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user to create the M&M meme for.')
				.setRequired(true),
		),
	category: CommandCategory.Image,
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('user');

		if (!user) {
			await sendMessage({
				interaction,
				message: 'Please mention a valid user to create the M&M meme.',
				ephemeral: true,
				color: 'Red',
				emoji: Emojis.Failed,
			});
			return;
		}

		await interaction.deferReply();

		const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 512 });
		const apiUrl = `https://api.popcat.xyz/mnm?image=${encodeURIComponent(avatarUrl)}`;

		const embed = new EmbedBuilder()
			.setTitle(`${user.username}'s M&M Meme`)
			.setImage(apiUrl)
			.setColor('Random')
			.setTimestamp();

		await interaction.editReply({ embeds: [embed] });
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
