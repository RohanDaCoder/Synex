import {
	SlashCommandBuilder,
	EmbedBuilder,
	InteractionContextType,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';
import { type Command, CommandCategory } from '../../types';
import sendMessage from '@/util/sendMessage';
import getEmoji from '@/util/getEmoji';
import config from '@/config';

const cooldowns = new Map<string, number>();
const COOLDOWN_DURATION = 5 * 60 * 1000;

export default {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a message to the developers')
		.addStringOption((option) =>
			option
				.setName('message')
				.setDescription('The message to send')
				.setRequired(true),
		)
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Utility,
	async run({ interaction, client }) {
		const userId = interaction.user.id;
		const lastUsed = cooldowns.get(userId) || 0;
		const now = Date.now();
		const remaining = lastUsed + COOLDOWN_DURATION - now;

		if (lastUsed && remaining > 0) {
			const minutes = Math.ceil(remaining / 60000);
			await sendMessage({
				interaction,
				message: `You can use this command again in ${minutes} minute${minutes > 1 ? 's' : ''}`,
				emoji: getEmoji('Failed'),
				ephemeral: true,
			});
			return;
		}

		const userMessage = interaction.options.getString('message', true);

		const embed = new EmbedBuilder()
			.setTitle('💬 Message from User')
			.setDescription(`\`\`\`${userMessage}\`\`\``)
			.setThumbnail(interaction.user.displayAvatarURL())
			.addFields([
				{
					name: 'From',
					value: `${interaction.user.tag}`,
					inline: true,
				},
			])
			.setTimestamp()
			.setColor(0x0099ff);

		const profileButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel('View Profile')
				.setURL(`https://discord.com/users/${interaction.user.id}`),
		);

		await interaction.deferReply();

		let successCount = 0;

		for (const devId of config.devUserIds) {
			try {
				const devUser = await client.users.fetch(devId);
				await devUser.send({ embeds: [embed], components: [profileButton] });
				successCount++;
			} catch (_error) {
				void _error;
			}
		}

		if (successCount > 0) {
			cooldowns.set(userId, now);
		}

		if (successCount === 0) {
			await sendMessage({
				interaction,
				message: 'Developers are not receiving messages right now',
				emoji: getEmoji('Failed'),
				color: 'Red',
				ephemeral: true,
			});
		} else {
			await sendMessage({
				interaction,
				message: 'Message sent',
				emoji: getEmoji('Success'),
				color: 'Green',
			});
		}
	},
} as Command;
