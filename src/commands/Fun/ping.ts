import {
	EmbedBuilder,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { CommandCategory, type Command } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Checks the bot's latency.")
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Fun,
	run: async ({ interaction, client }) => {
				const embed = new EmbedBuilder()
			.setTitle('Client Ping')
			.addFields({
				name: '*Latency*',
				value: `${Date.now() - interaction.createdTimestamp}ms`,
			})
			.addFields({
				name: '*API Latency*',
				value: client.ws.ping === -1 ? 'N/A' : `${Math.round(client.ws.ping)}ms`,
			})
			.setColor('Blurple')
			.setTimestamp()
			.setFooter({
				text: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			});
		await interaction.reply({
			embeds: [embed],
			content: 'Pong!',
		});
	},
} as Command;
