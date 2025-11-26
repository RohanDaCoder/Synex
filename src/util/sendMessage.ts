import { EmbedBuilder } from 'discord.js';
import type { ReplyOptions } from '../types';

/**
 * Sends a embed with a custom emoji, color, message.
 *
 * @async
 * @param {ReplyOptions} props The arguments for sending messages
 * @returns {Promise<void>}
 */
async function sendMessage(props: ReplyOptions): Promise<void> {
	const {
		interaction,
		ephemeral = false,
		message,
		emoji,
		color = 'Red',
	} = props;

	const modifiedMessage = emoji ? `${emoji} ${message}` : message;

	const embed = new EmbedBuilder()
		.setDescription(modifiedMessage)
		.setColor(color)
		.setTimestamp();

	if (interaction.replied || interaction.deferred) {
		await interaction.followUp({
			embeds: [embed],
			flags: ephemeral ? 'Ephemeral' : undefined,
		});
	} else {
		await interaction.reply({
			embeds: [embed],
			flags: ephemeral ? 'Ephemeral' : undefined,
		});
	}
}

export default sendMessage;
