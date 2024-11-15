import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import { Emojis } from '@/config';

export default {
  data: new SlashCommandBuilder()
    .setName('whowouldwin')
    .setDescription(
      "Creates a 'Who would win?' meme with the avatars of two users.",
    )
    .addUserOption((option) =>
      option
        .setName('user1')
        .setDescription('The first user.')
        .setRequired(true),
    )
    .addUserOption((option) =>
      option
        .setName('user2')
        .setDescription('The second user.')
        .setRequired(true),
    ),
  category: CommandCategory.Fun,
  run: async ({ interaction }) => {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');

    if (!user1 || !user2) {
      await sendMessage({
        interaction,
        message: 'Please mention two valid users to create the meme.',
        ephemeral: true,
        color: 'Red',
        emoji: Emojis.Failed,
      });
      return;
    }

    await interaction.deferReply();

    const avatar1 = user1.displayAvatarURL({ extension: 'png', size: 512 });
    const avatar2 = user2.displayAvatarURL({ extension: 'png', size: 512 });
    const apiUrl = `https://api.popcat.xyz/whowouldwin?image1=${encodeURIComponent(avatar1)}&image2=${encodeURIComponent(avatar2)}`;

    const embed = new EmbedBuilder()
      .setTitle('Who Would Win?')
      .setImage(apiUrl)
      .setColor('Random')
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
} as Command;
