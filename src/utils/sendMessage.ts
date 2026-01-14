import { EmbedBuilder, Colors } from 'discord.js';
import type { ReplyOptions } from '../types';

export async function sendMessage(props: ReplyOptions): Promise<void> {
	const { interaction, message, emoji, color = 'Red', components } = props;
	const modifiedMessage = emoji ? `${emoji} ${message}` : message;

	const embed = new EmbedBuilder()
		.setDescription(modifiedMessage)
		.setColor(Colors[color])
		.setTimestamp();

	if (interaction.replied || interaction.deferred) {
		await interaction.followUp({ embeds: [embed], components });
	} else {
		await interaction.reply({ embeds: [embed], components });
	}
}
