import { Guild, PermissionFlagsBits } from 'discord.js';
import client, { db } from '..';

export default async function updateServerStats(guild: Guild) {
		const [humanChannelId, botChannelId, allChannelId] = await Promise.all([
		db.get(`serverstats_humanChannel_id_${guild.id}`),
		db.get(`serverstats_botChannel_id_${guild.id}`),
		db.get(`serverstats_allChannel_id_${guild.id}`),
	]);
	const channelIds = {
		humanChannel: humanChannelId,
		botChannel: botChannelId,
		allChannel: allChannelId,
	};

		const [humanChannelName, botChannelName, allChannelName] = await Promise.all([
		db.get(`serverstats_humanChannel_name_${guild.id}`),
		db.get(`serverstats_botChannel_name_${guild.id}`),
		db.get(`serverstats_allChannel_name_${guild.id}`),
	]);
	const channelNames = {
		humanChannel: humanChannelName || 'Humans',
		botChannel: botChannelName || 'Bots',
		allChannel: allChannelName || 'All Members',
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

export async function updateAllServerStats() {
	for (const g of await client.guilds.fetch()) {
		const fullGuild: Guild = await client.guilds.fetch(g[1].id);
		await updateServerStats(fullGuild);
	}
}
