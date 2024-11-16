import {
	SlashCommandBuilder,
	InteractionContextType,
	ChannelType,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import { db } from '@/index';
import { Emojis } from '@/config';
import sendMessage from '@/utils/sendMessage';

export default {
	data: new SlashCommandBuilder()
		.setName('setupstats')
		.setDescription(
			'Sets up the server stats voice channels for bot, human, and all members.',
		)
		.setContexts(InteractionContextType.Guild)
		.addChannelOption((option) =>
			option
				.setName('category')
				.setDescription('The category to place the channels in.')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('human_channel_name')
				.setDescription('The name of the human count voice channel.')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('bot_channel_name')
				.setDescription('The name of the bot count voice channel.')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('all_channel_name')
				.setDescription('The name of the all members count voice channel.')
				.setRequired(true),
		),
	category: CommandCategory.Admin,
	run: async ({ interaction }) => {
		const guild = interaction.guild!;
		const category = interaction.options.getChannel('category')!;
		const humanChannelName =
			interaction.options.getString('human_channel_name')!;
		const botChannelName = interaction.options.getString('bot_channel_name')!;
		const allChannelName = interaction.options.getString('all_channel_name')!;

		if (category.type !== ChannelType.GuildCategory) {
			await sendMessage({
				interaction,
				message: 'Please provide a valid category.',
				emoji: Emojis.Failed,
				ephemeral: true,
			});
			return;
		}

		const channels = await Promise.all([
			guild.channels.create({
				name: humanChannelName,
				type: ChannelType.GuildVoice,
				parent: category.id,
				permissionOverwrites: [
					{
						id: guild.id,
						deny: ['Connect'],
					},
				],
			}),
			guild.channels.create({
				name: botChannelName,
				type: ChannelType.GuildVoice,
				parent: category.id,
				permissionOverwrites: [
					{
						id: guild.id,
						deny: ['Connect'],
					},
				],
			}),
			guild.channels.create({
				name: allChannelName,
				type: ChannelType.GuildVoice,
				parent: category.id,
				permissionOverwrites: [
					{
						id: guild.id,
						deny: ['Connect'],
					},
				],
			}),
		]);

		const channelIds = {
			humanChannel: channels[0]?.id,
			botChannel: channels[1]?.id,
			allChannel: channels[2]?.id,
		};

		await Promise.all(
			Object.entries(channelIds).map(([key, value]) => {
				return db.set(`serverstats_${key}_${guild.id}`, value);
			}),
		);

		await sendMessage({
			interaction,
			message: 'Server stats voice channels have been successfully set up.',
			emoji: Emojis.Success,
			ephemeral: false,
		});
	},
	options: {
		userPermissions: 'ManageChannels',
		botPermissions: ['ManageChannels', 'ManageGuild'],
	},
} as Command;
