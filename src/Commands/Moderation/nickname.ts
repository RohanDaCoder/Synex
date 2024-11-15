import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import { Emojis } from '@/config';
import sendMessage from '@/utils/sendMessage';

export default {
  data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Change the nickname of a user.')
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user whose nickname you want to change')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('nickname')
        .setDescription('The new nickname for the user')
        .setRequired(true),
    ),
  category: CommandCategory.Moderation,
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('user')!;
    const nickname = interaction.options.getString('nickname')!;

    const member = await interaction.guild!.members.fetch(user.id);

    if (!member) {
      return sendMessage({
        message: 'I could not find the specified member in this server.',
        interaction,
        color: 'Red',
        emoji: Emojis.Failed,
        ephemeral: true,
      });
    }

    try {
      await member.setNickname(nickname);
      return sendMessage({
        message: `Successfully changed nickname for **${user.tag}** to **${nickname}**.`,
        interaction,
        emoji: Emojis.Success,
        ephemeral: true,
        color: 'Green',
      });
    } catch (error) {
      console.error(error);
      return sendMessage({
        message: `Failed to change nickname for **${user.tag}**.`,
        interaction,
        emoji: Emojis.Failed,
        color: 'Red',
        ephemeral: true,
      });
    }
  },
  options: {
    botPermissions: ['ManageNicknames', 'ChangeNickname'],
    userPermissions: ['ManageNicknames', 'ChangeNickname'],
  },
} as Command;
