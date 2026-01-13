import {
	EmbedBuilder,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { CommandCategory, type Command } from '../../types';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Checks the bot's latency.")
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Fun,
	run: async ({ interaction, client }) => {
		const sent = await interaction.reply({
			content: 'Pinging...',
			withResponse: true,
		});
		const roundtripLatency = sent.resource?.message?.createdTimestamp
			? sent.resource.message.createdTimestamp - interaction.createdTimestamp
			: Date.now() - interaction.createdTimestamp;
		const websocketPing = Math.round(client.ws.ping);
		const apiLatency = client.ws.ping === -1 ? 'N/A' : `${websocketPing}ms`;
		const embed = new EmbedBuilder()
			.setTitle('Pong!')
			.setColor(0x00ff00)
			.addFields(
				{
					name: ':stopwatch: Roundtrip Latency',
					value: `**${roundtripLatency}ms**`,
					inline: true,
				},
				{
					name: ':heart_on_fire: Websocket Heartbeat',
					value: `**${apiLatency}**`,
					inline: true,
				},
			)
			.setFooter({
				text: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setTimestamp();

		if (client.user) {
			embed.setThumbnail(client.user.displayAvatarURL());
		}

		await interaction.editReply({ content: null, embeds: [embed] });
	},
} as Command;
