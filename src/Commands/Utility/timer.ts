import parse from 'parse-duration';
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
		.setName('timer')
		.setDescription(
			'Set a timer using a human-readable duration (e.g., 5d 4h 3m 2s)',
		)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((o) =>
			o
				.setName('duration')
				.setDescription('Duration (e.g., 5d 4h 3m 2s)')
				.setRequired(true),
		),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		const durationInput = interaction.options.getString('duration')!;
		const totalMilliseconds = parse(durationInput || '');

		if (!totalMilliseconds || totalMilliseconds <= 0) {
			return sendMessage({
				interaction,
				message: 'Invalid duration. Use a format like 5d 4h 3m 2s.',
				emoji: Emojis.Failed,
				ephemeral: true,
			});
		}

		const endTime = new Date(Date.now() + totalMilliseconds);
		const embed = new EmbedBuilder()
			.setTitle('⏳ Timer Set')
			.setDescription(
				`The timer is set for **${durationInput.trim()}**.\nIt will end <t:${Math.floor(
					endTime.getTime() / 1000,
				)}:R> (<t:${Math.floor(endTime.getTime() / 1000)}:F>).`,
			)
			.setColor(0x7289da)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });

		setTimeout(async () => {
			await sendMessage({
				interaction,
				message: '⏰ Time’s up!',
				emoji: Emojis.Success,
				ephemeral: false,
			});
		}, totalMilliseconds);
	},
} as Command;
