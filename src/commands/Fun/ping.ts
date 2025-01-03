import {
	EmbedBuilder,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';
import { CommandCategory, type Command } from '@/types';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Fun,
	run: async ({ interaction, client }) => {
		const embed = new EmbedBuilder()
			.setColor('#2F3136')
			.setTitle('Client Ping')
			.addFields({
				name: '*Latency*',
				value: `${Date.now() - interaction.createdTimestamp}ms`,
			})
			.addFields({
				name: '*API Latency*',
				value: `${Math.round(client.ws.ping)}ms`,
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
