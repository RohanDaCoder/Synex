import {
	SlashCommandBuilder,
	InteractionContextType,
	EmbedBuilder,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config.example';

export default {
	data: new SlashCommandBuilder()
		.setName('accountage')
		.setDescription("Check Someone's Account's Age")
		.setContexts(InteractionContextType.Guild)
		.addUserOption((o) => o.setName('target').setDescription('The Target User'))
		.addStringOption((o) => o.setName('user_id').setDescription('The User ID')),
	category: CommandCategory.Utility,
	run: async ({ interaction, client }) => {
		const userId = interaction.options.getString('user_id');
		const userOption = interaction.options.getUser('target');
		const target = userId
			? await client.users
					.fetch(userId, { cache: false, force: true })
					.catch(() => null)
			: userOption || interaction.user;

		if (!target) {
			return sendMessage({
				interaction,
				message: 'Invalid user or user ID provided.',
				emoji: Emojis.Failed,
				ephemeral: true,
			});
		}

		const createdAt = target.createdAt;
		const now = new Date();
		let diff = now.getTime() - createdAt.getTime();
		const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
		diff %= 1000 * 60 * 60 * 24 * 365.25;
		const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
		diff %= 1000 * 60 * 60 * 24 * 30;
		const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
		diff %= 1000 * 60 * 60 * 24 * 7;
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		diff %= 1000 * 60 * 60 * 24;
		const hours = Math.floor(diff / (1000 * 60 * 60));
		diff %= 1000 * 60 * 60;
		const minutes = Math.floor(diff / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		const description = [
			years && `${years} years`,
			months && `${months} months`,
			weeks && `${weeks} weeks`,
			days && `${days} days`,
			hours && `${hours} hours`,
			minutes && `${minutes} minutes`,
			`${seconds} seconds`,
		]
			.filter(Boolean)
			.join(', ');

		const embed = new EmbedBuilder()
			.setTitle(`${target.username}'s Account Age`)
			.setDescription(description)
			.setThumbnail(target.displayAvatarURL({ size: 64 }))
			.setColor(0x7289da)
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
} as Command;
