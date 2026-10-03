import { EmbedBuilder, type InteractionReplyOptions } from 'discord.js';
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
		components,
	} = props;

	const modifiedMessage = emoji ? `${emoji} ${message}` : message;

	const embed = new EmbedBuilder()
		.setDescription(modifiedMessage)
		.setColor(color)
		.setTimestamp();

	const payload: InteractionReplyOptions = {
		embeds: [embed],
		flags: ephemeral ? 'Ephemeral' : undefined,
		components,
	};

	if (interaction.replied || interaction.deferred) {
		await interaction.followUp(payload);
		return;
	}

	await interaction.reply(payload);
}

export default sendMessage;
