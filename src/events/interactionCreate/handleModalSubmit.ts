import { Events, EmbedBuilder, type Interaction } from 'discord.js';
import type { Event } from '../../types';
import config from '@/config';
import log from '@/util/log';
import sendMessage from '@/util/sendMessage';
import getEmoji from '@/util/getEmoji';

export default {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		if (!interaction.isModalSubmit()) return;

		if (interaction.customId !== 'bug_report_modal') return;

		if (!interaction.guild || !interaction.channel) {
			log('ERROR', 'Bug report submitted outside of a guild or channel');
			await sendMessage({
				interaction,
				message:
					'Sorry, bug reports can only be submitted within a server channel.',
				emoji: getEmoji('Failed'),
			});
			return;
		}

		const severity = interaction.fields.getTextInputValue('bug_severity');
		const title = interaction.fields.getTextInputValue('bug_title');
		const description = interaction.fields.getTextInputValue('bug_description');
		const steps = interaction.fields.getTextInputValue('bug_steps');

		const severityEmojis: Record<string, string> = {
			low: ':green_circle:',
			medium: ':yellow_circle:',
			high: ':orange_circle:',
			critical: ':red_circle:',
		};

		const normalizedSeverity = severity.toLowerCase().trim();
		const severityEmoji = severityEmojis[normalizedSeverity] || ':question:';

		const embed = new EmbedBuilder()
			.setTitle(':bug: Bug Report')
			.setDescription(`**Severity:** ${severityEmoji} ${severity}`)
			.addFields(
				{
					name: 'Title',
					value: title,
					inline: false,
				},
				{
					name: 'Description',
					value: description,
					inline: false,
				},
				{
					name: 'Steps to Reproduce',
					value: steps,
					inline: false,
				},
				{
					name: 'Reported By',
					value: `<@${interaction.user.id}> (${interaction.user.id})`,
					inline: true,
				},
				{
					name: 'Guild',
					value: `${interaction.guild.name} (${interaction.guild.id})`,
					inline: true,
				},
				{
					name: 'Channel',
					value: `<#${interaction.channel.id}>`,
					inline: true,
				},
			)
			.setColor(0xff0000)
			.setTimestamp()
			.setFooter({
				text: interaction.user.displayName,
				iconURL: interaction.user.displayAvatarURL(),
			});

		try {
			const channel = await interaction.client.channels.fetch(
				config.bugReportChannelId,
			);

			if (channel && 'send' in channel) {
				await channel.send({ embeds: [embed] });
				await sendMessage({
					interaction,
					message: 'Thank you for your bug report! It has been submitted.',
					emoji: getEmoji('Success'),
					color: 'Green',
					ephemeral: true,
				});
			} else {
				log(
					'ERROR',
					`Failed to send bug report: Channel ${config.bugReportChannelId} is not a text-based channel`,
				);
				await sendMessage({
					interaction,
					message:
						'Sorry, there was an error submitting your bug report. The report channel is unreachable.',
					emoji: getEmoji('Failed'),
					ephemeral: true,
				});
			}
		} catch (error: any) {
			log('ERROR', `Failed to send bug report to channel: ${error.message}`);
			await sendMessage({
				interaction,
				message:
					'Sorry, there was an error submitting your bug report. The report channel is unreachable.',
				emoji: getEmoji('Failed'),
				ephemeral: true,
			});
		}
	},
} as Event<Events.InteractionCreate>;
