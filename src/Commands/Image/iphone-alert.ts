import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';

export default {
  data: new SlashCommandBuilder()
    .setName('iphone-alert')
    .setDescription('Creates an iPhone alert meme with your text.')
    .addStringOption((option) =>
      option
        .setName('text')
        .setDescription('The text to display in the alert.')
        .setRequired(true),
    ),
  category: CommandCategory.Image,
  run: async ({ interaction }) => {
    const text = interaction.options.getString('text')!;

    await interaction.deferReply();
    const apiUrl = `https://api.popcat.xyz/alert?text=${encodeURIComponent(text)}`;

    const embed = new EmbedBuilder()
      .setTitle('iPhone Alert Meme')
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
