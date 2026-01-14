import { SlashCommandBuilder, PermissionFlagsBits, TextChannel, InteractionContextType } from 'discord.js';
import { Command, CommandContext, type CommandOptions } from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/index.js';

export class PurgeCommand extends Command {
  readonly name = 'purge';
  readonly description = 'Delete messages in a channel';
  readonly options: CommandOptions = {
    cooldown: 10,
    userPermissions: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ReadMessageHistory],
    devOnly: false,
    group: 'moderation',
  };

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true).setMinValue(1).setMaxValue(100),
    )
    .addUserOption((option) =>
      option.setName('user').setDescription('Only delete messages from this user'),
    );

  async execute({ interaction, guild, channel }: CommandContext): Promise<void> {
    const amount = interaction.options.getInteger('amount', true);
    const user = interaction.options.getUser('user');

    if (!guild || !channel || !(channel instanceof TextChannel)) {
      await sendMessage({
        interaction,
        message: 'This command can only be used in a text channel',
        emoji: emoji('failed'),
        color: 'Red',
      });
      return;
    }

    try {
      const messages = await channel.messages.fetch({ limit: amount });

      if (user) {
        const filtered = messages.filter((m) => m.author.id === user.id);
        const deleted = await channel.bulkDelete(filtered);
        await sendMessage({
          interaction,
          message: `Deleted ${deleted.size} messages from ${user.tag}`,
          emoji: emoji('purge'),
          color: 'Green',
        });
      } else {
        const deleted = await channel.bulkDelete(messages);
        await sendMessage({
          interaction,
          message: `Deleted ${deleted.size} messages`,
          emoji: emoji('purge'),
          color: 'Green',
        });
      }
    } catch (error) {
      await sendMessage({
        interaction,
        message: `Failed to delete messages: ${(error as Error).message}`,
        emoji: emoji('failed'),
        color: 'Red',
      });
    }
  }
}
