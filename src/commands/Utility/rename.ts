import {
	SlashCommandBuilder,
	InteractionContextType,
	TextChannel,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setName('rename')
		.setDescription('Renames the current channel.')
		.addStringOption((option) =>
			option
				.setName('new-name')
				.setDescription('New name for the channel')
				.setRequired(true),
		)
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Moderation,
	run: async ({ interaction }) => {
		const newName = interaction.options.getString('new-name')!;
		if (!(interaction.channel instanceof TextChannel) || !interaction.channel)
			return;
		await interaction.deferReply({ ephemeral: true });

		await interaction.channel.setName(
			newName,
			`Channel name changed by ${interaction.user.tag}`,
		);
		await sendMessage({
			interaction,
			message: `Channel renamed to \`${newName}\``,
			color: 'Green',
			emoji: Emojis.Success,
			ephemeral: true,
		});
	},
	options: {
		botPermissions: 'ManageChannels',
		userPermissions: 'ManageChannels',
	},
} as Command;
