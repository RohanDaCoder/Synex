import { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } from 'discord.js';
import { Command, CommandContext, type CommandOptions } from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/index.js';

export class BanCommand extends Command {
  readonly name = 'ban';
  readonly description = 'Ban a user from the server';
  readonly options: CommandOptions = {
    cooldown: 10,
    userPermissions: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers, PermissionFlagsBits.EmbedLinks],
    devOnly: false,
    group: 'moderation',
  };

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName('user').setDescription('User to ban').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Ban reason').setMaxLength(512),
    )
    .addIntegerOption((option) =>
      option.setName('days').setDescription('Number of days to delete messages (0-7)').setMinValue(0).setMaxValue(7),
    );

  async execute({ interaction, guild }: CommandContext): Promise<void> {
    const userOption = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const days = interaction.options.getInteger('days') ?? 0;

    if (!guild) return;

    try {
      await guild.members.ban(userOption.id, {
        reason,
        deleteMessageDays: days,
      });

      await sendMessage({
        interaction,
        message: `${userOption.tag} has been banned\nReason: ${reason}`,
        emoji: emoji('ban'),
        color: 'Green',
      });
    } catch (error) {
      await sendMessage({
        interaction,
        message: `Failed to ban user: ${(error as Error).message}`,
        emoji: emoji('failed'),
        color: 'Red',
      });
    }
  }
}
