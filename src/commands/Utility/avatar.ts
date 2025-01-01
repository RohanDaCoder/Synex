import {
	EmbedBuilder,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { Command, CommandCategory } from '../../types';

export default {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription("Fetch A User's Or Your Avatar")
		.setContexts(InteractionContextType.Guild)
		.addUserOption((option) =>
			option.setName('target').setDescription('The Target User'),
		),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		const target = interaction.options.getUser('target') || interaction.user;
		const targetAvatar = target.displayAvatarURL({
			forceStatic: false,
			extension: 'png',
		});
		const embed = new EmbedBuilder()
			.setAuthor({
				name: target.username,
				iconURL: targetAvatar,
			})
			.setTimestamp()
			.setImage(targetAvatar);
		await interaction.reply({
			embeds: [embed],
		});
	},
	options: {
		botPermissions: 'EmbedLinks',
	},
} as Command;
