import {
  SlashCommandBuilder,
  InteractionContextType,
  ChannelType,
  PermissionFlagsBits,
} from 'discord.js';
import { Command, CommandCategory } from '../../types';
import { db } from '@/index';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config';

export default {
  data: new SlashCommandBuilder()
    .setName('setup-welcomer-channel')
    .setDescription('Configure the welcome channel for your server.')
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((o) =>
      o
        .setName('channel')
        .setDescription('The channel where welcome messages will be sent.')
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
        .setRequired(true),
    )
    .addBooleanOption((option) =>
      option
        .setName('replace-channel')
        .setDescription(
          'If a welcome channel is already set, should it be replaced?',
        )
        .setRequired(false),
    ),
  category: CommandCategory.Utility,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const channel = interaction.options.getChannel('channel');
    if (!channel)
      return sendMessage({
        interaction,
        emoji: Emojis.Failed,
        message: 'The specified channel could not be found.',
      });
    const currentWelcomeChannel = await db.get(
      `gateway_${interaction.guild?.id}`,
    );
    const replaceChannel =
      interaction.options.getBoolean('replace-channel') ?? false;

    if (!currentWelcomeChannel || replaceChannel) {
      await db.set(`gateway_${interaction.guild?.id}`, channel.id);
      await sendMessage({
        interaction,
        emoji: Emojis.Success,
        message: `Welcome channel successfully set to ${channel}.`,
        color: 'Green',
      });
      return;
    }

    await sendMessage({
      interaction,
      emoji: Emojis.Failed,
      message: `A welcome channel is already set to <#${currentWelcomeChannel}>. To change it, enable the "replace-channel" option.`,
    });
  },
} as Command;
