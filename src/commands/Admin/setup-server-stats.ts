import { Emojis } from '@/config';
import { db } from '@/index';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { updateAllServerStats } from '@/utils/updateServerStats';
import {
	CategoryChannel,
	ChannelType,
	InteractionContextType,
	SlashCommandBuilder,
} from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('setup-server-stats')
		.setDescription(
			'Sets up the server stats voice channels for bot, human, and all members.',
		)
		.setContexts(InteractionContextType.Guild)
		.addChannelOption((option) =>
			option
				.setName('category')
				.setDescription('The category to place the channels in.')
				.addChannelTypes(ChannelType.GuildCategory)
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
		await interaction.deferReply();
		const guild = interaction.guild!;
		const category: CategoryChannel =
			interaction.options.getChannel('category')!;
		const humanChannelName =
			interaction.options.getString('human_channel_name')!;
		const botChannelName = interaction.options.getString('bot_channel_name')!;
		const allChannelName = interaction.options.getString('all_channel_name')!;

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

		await db.set(
			`serverstats_humanChannel_id_${interaction.guild!.id}`,
			channels[0]?.id,
		);
		await db.set(
			`serverstats_botChannel_id_${interaction.guild!.id}`,
			channels[1]?.id,
		);
		await db.set(
			`serverstats_allChannel_id_${interaction.guild!.id}`,
			channels[2]?.id,
		);

		await db.set(
			`serverstats_humanChannel_name_${interaction.guild!.id}`,
			humanChannelName,
		);
		await db.set(
			`serverstats_botChannel_name_${interaction.guild!.id}`,
			botChannelName,
		);
		await db.set(
			`serverstats_allChannel_name_${interaction.guild!.id}`,
			allChannelName,
		);

		await updateAllServerStats();
		await sendMessage({
			interaction,
			message: 'Server stats voice channels have been successfully set up.',
			emoji: Emojis.Success,
			color: 'Green',
		});
	},
	options: {
		userPermissions: 'ManageChannels',
		botPermissions: ['ManageChannels', 'ManageGuild'],
	},
} as Command;
