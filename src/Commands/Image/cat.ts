import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Fetch a random cat picture'),
  category: CommandCategory.Image,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const response = await axios.get(
      'https://api.thecatapi.com/v1/images/search',
    );
    const catImageUrl = response.data[0].url;

    const catEmbed = new EmbedBuilder()
      .setColor(0xffa500)
      .setTitle('Random Cat Picture')
      .setImage(catImageUrl)
      .setTimestamp();

    await interaction.editReply({ embeds: [catEmbed] });
  },
  options: {
    botPermissions: 'EmbedLinks',
  },
} as Command;
