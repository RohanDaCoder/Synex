import {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ChatInputCommandInteraction,
	Client,
	Guild,
	type GuildTextBasedChannel,
} from 'discord.js';
import type { Command, Config } from '../types';
import log from './log';
import { getMissingPermissions } from './permissionUtils';
import getEmoji from './getEmoji';

interface LogCommandUsageParams {
	interaction: ChatInputCommandInteraction;
	command: Command;
	client: Client;
	config: Config;
	success: boolean;
	error?: Error;
}

let channelValidated = false;
let isChannelValid = true;

async function logCommandUsage(params: LogCommandUsageParams): Promise<void> {
	const { interaction, command, client, config, success, error } = params;

	if (!config.usageLogChannelId) {
		return;
	}

	if (!channelValidated) {
		isChannelValid = await validateLogChannel(client, config.usageLogChannelId);
		channelValidated = true;
	}

	if (!isChannelValid) {
		return;
	}

	try {
		const logChannel = (await client.channels.fetch(
			config.usageLogChannelId,
		)) as GuildTextBasedChannel | null;

		if (!logChannel) {
			log('WARN', 'Usage log channel is unreachable');
			return;
		}

		const argumentsString = formatArguments(interaction);
		const inviteUrl = interaction.guild
			? await getPublicInviteUrl(interaction.guild, client)
			: null;

		const embed = new EmbedBuilder()
			.setTitle(
				`${success ? getEmoji('Success') : getEmoji('Failed')} Command ${success ? 'Executed' : 'Failed'}`,
			)
			.setColor(success ? 0x2ecc71 : 0xe74c3c)
			.addFields(
				{
					name: '🔹 Command',
					value: `**${interaction.commandName}** (${command.category})`,
					inline: true,
				},
				{
					name: '🔹 User',
					value: `${interaction.user.tag}\nID: ${interaction.user.id}`,
					inline: true,
				},
				{
					name: '🔹 Guild',
					value: `${interaction.guild?.name || 'DM'}\nID: ${interaction.guildId || 'N/A'}`,
					inline: true,
				},
				{
					name: '🔹 Arguments',
					value: argumentsString,
					inline: false,
				},
			)
			.setTimestamp();

		if (!success && error) {
			embed.addFields({
				name: '❌ Error',
				value: error.message,
				inline: false,
			});
		}

		if (interaction.user.avatar) {
			embed.setThumbnail(interaction.user.displayAvatarURL());
		}

		embed.addFields({
			name: '⏰ Time',
			value: `<t:${Math.floor(Date.now() / 1000)}:R>`,
			inline: true,
		});

		const components = [];

		if (inviteUrl) {
			const inviteButton = new ButtonBuilder()
				.setStyle(5)
				.setLabel('🔗 Invite Link')
				.setURL(inviteUrl);

			components.push(
				new ActionRowBuilder<ButtonBuilder>().addComponents(inviteButton),
			);
		}

		await logChannel.send({
			embeds: [embed],
			components: components.length > 0 ? components : undefined,
		});
	} catch (err) {
		console.error('Failed to log command usage:', err);
	}
}

function formatArguments(interaction: ChatInputCommandInteraction): string {
	const options = interaction.options.data;
	if (options.length === 0) {
		return 'No arguments';
	}

	return options
		.map((opt) => {
			const value = formatOptionValue(opt.value);
			return `${opt.name}: ${value}`;
		})
		.join(', ');
}

function formatOptionValue(value: any): string {
	if (value === null || value === undefined) {
		return 'N/A';
	}
	if (typeof value === 'object' && 'id' in value) {
		return `<@${value.id}>`;
	}
	if (typeof value === 'boolean') {
		return value ? 'Yes' : 'No';
	}
	return String(value);
}

async function getPublicInviteUrl(
	guild: Guild,
	_client: Client,
): Promise<string | null> {
	try {
		const botMember = await guild.members.fetchMe();
		const missing = getMissingPermissions(botMember, 'ManageGuild');

		if (missing.length > 0) {
			return null;
		}

		const invites = await guild.invites.fetch();

		const validInvite = invites.find(
			(invite) =>
				(!invite.expiresAt || new Date(invite.expiresAt) > new Date()) &&
				(!invite.maxUses ||
					(invite.uses !== null && invite.uses < invite.maxUses)),
		);

		return validInvite?.url || null;
	} catch {
		return null;
	}
}

async function validateLogChannel(
	client: Client,
	channelId: string,
): Promise<boolean> {
	try {
		const channel = await client.channels.fetch(channelId);
		if (!channel || !('send' in channel)) {
			log(
				'WARN',
				'Usage log channel is invalid or unreachable. Skipping command logging.',
			);
			return false;
		}
		return true;
	} catch {
		log(
			'WARN',
			'Usage log channel is invalid or unreachable. Skipping command logging.',
		);
		return false;
	}
}

export default logCommandUsage;
