import { Guild, PermissionFlagsBits } from 'discord.js';
import { db } from '..';

export default async function updateServerStats(guild: Guild) {
	const channelIds = {
		humanChannel: await db.get(`serverstats_human_${guild.id}`),
		botChannel: await db.get(`serverstats_bot_${guild.id}`),
		allChannel: await db.get(`serverstats_all_${guild.id}`),
	};

	const channelNames = {
		humanChannel:
			(await db.get(`serverstats_human_name_${guild.id}`)) || 'Humans',
		botChannel: (await db.get(`serverstats_bot_name_${guild.id}`)) || 'Bots',
		allChannel:
			(await db.get(`serverstats_all_name_${guild.id}`)) || 'All Members',
	};

	if (
		!channelIds.humanChannel ||
		!channelIds.botChannel ||
		!channelIds.allChannel
	)
		return;

	const humanChannel = await guild.channels.fetch(channelIds.humanChannel);
	const botChannel = await guild.channels.fetch(channelIds.botChannel);
	const allChannel = await guild.channels.fetch(channelIds.allChannel);

	if (!humanChannel || !botChannel || !allChannel) return;

	const botPermissions = guild.members.me?.permissionsIn(humanChannel);
	if (
		!botPermissions ||
		!botPermissions.has(PermissionFlagsBits.ManageChannels)
	) {
		return;
	}

	const allMembersCount = guild.memberCount;
	const humanCount = (await guild.members.fetch()).filter(
		(member) => !member.user.bot,
	).size;
	const botCount = (await guild.members.fetch()).filter(
		(member) => member.user.bot,
	).size;

	const checkChannelPermissions = (channel: any) => {
		const permissions = guild.members.me?.permissionsIn(channel);
		if (!permissions || !permissions.has(PermissionFlagsBits.ManageChannels)) {
			return false;
		}
		return true;
	};

	if (
		!checkChannelPermissions(humanChannel) ||
		!checkChannelPermissions(botChannel) ||
		!checkChannelPermissions(allChannel)
	) {
		return;
	}

	if (humanChannel.isTextBased() || humanChannel.isVoiceBased()) {
		humanChannel
			.setName(`${channelNames.humanChannel}: ${humanCount}`)
			.catch(console.error);
	}

	if (botChannel.isTextBased() || botChannel.isVoiceBased()) {
		botChannel
			.setName(`${channelNames.botChannel}: ${botCount}`)
			.catch(console.error);
	}

	if (allChannel.isTextBased() || allChannel.isVoiceBased()) {
		allChannel
			.setName(`${channelNames.allChannel}: ${allMembersCount}`)
			.catch(console.error);
	}
}
