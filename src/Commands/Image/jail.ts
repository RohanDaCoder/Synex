import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';

export default {
  data: new SlashCommandBuilder()
    .setName('jail')
    .setDescription('Puts a user behind bars.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to put behind bars.')
        .setRequired(true),
    ),
  category: CommandCategory.Image,
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('user');

    if (!user) {
      await sendMessage({
        interaction,
        message: 'Please mention a valid user to put behind bars!',
        ephemeral: true,
        color: 'Red',
      });
      return;
    }

    await interaction.deferReply();
    const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 512 });
    const apiUrl = `https://api.popcat.xyz/jail?image=${encodeURIComponent(avatarUrl)}`;

    const embed = new EmbedBuilder()
      .setTitle(`${user.username} is in jail!`)
      .setImage(apiUrl)
      .setColor('Random')
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
  options: {
    botPermissions: 'EmbedLinks',
  },
} as Command;
