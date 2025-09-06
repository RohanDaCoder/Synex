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
		.setDescription('Sets a timer.')
		.setContexts(InteractionContextType.Guild)
		.addStringOption((o) =>
			o
				.setName('duration')
				.setDescription('Duration (e.g., 5d 4h 3m 2s)')
				.setRequired(true),
		)
		.addStringOption((o) =>
			o
				.setName('title')
				.setDescription('Optional title for the timer')
				.setRequired(false),
		),
	category: CommandCategory.Utility,
	run: async ({ interaction }) => {
		const durationInput = interaction.options.getString('duration')!;
		const title = interaction.options.getString('title') || 'Timer';
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
			.setTitle(`${title}`)
			.setDescription(
				`Ends: <t:${Math.floor(
					endTime.getTime() / 1000,
				)}:R> (<t:${Math.floor(endTime.getTime() / 1000)}:F>)`,
			)
			.setColor(0x7289da);

		await interaction.reply({ embeds: [embed] });
	},
} as Command;
