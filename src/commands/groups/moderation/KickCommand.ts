import { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } from 'discord.js';
import { Command, CommandContext, type CommandOptions } from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/index.js';

export class KickCommand extends Command {
  readonly name = 'kick';
  readonly description = 'Kick a user from the server';
  readonly options: CommandOptions = {
    cooldown: 10,
    userPermissions: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers, PermissionFlagsBits.EmbedLinks],
    devOnly: false,
    group: 'moderation',
  };

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option.setName('user').setDescription('User to kick').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Kick reason').setMaxLength(512),
    );

  async execute({ interaction, guild }: CommandContext): Promise<void> {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!guild) return;

    try {
      await guild.members.kick(user.id, reason);

      await sendMessage({
        interaction,
        message: `${user.tag} has been kicked\nReason: ${reason}`,
        emoji: emoji('kick'),
        color: 'Green',
      });
    } catch (error) {
      await sendMessage({
        interaction,
        message: `Failed to kick user: ${(error as Error).message}`,
        emoji: emoji('failed'),
        color: 'Red',
      });
    }
  }
}
