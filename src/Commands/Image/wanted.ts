import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config';

export default {
  data: new SlashCommandBuilder()
    .setName('wanted')
    .setDescription('Creates a wanted poster for a user.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to create the wanted poster for.')
        .setRequired(true),
    ),
  category: CommandCategory.Image,
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('user');

    if (!user) {
      await sendMessage({
        interaction,
        message: 'Please mention a valid user to create the wanted poster.',
        ephemeral: true,
        color: 'Red',
        emoji: Emojis.Failed,
      });
      return;
    }

    await interaction.deferReply();

    const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 512 });
    const apiUrl = `https://api.popcat.xyz/wanted?image=${encodeURIComponent(avatarUrl)}`;

    const embed = new EmbedBuilder()
      .setTitle(`${user.username} is wanted!`)
      .setImage(apiUrl)
      .setColor('Random')
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
} as Command;
