import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('wouldyourather')
    .setDescription("Fetches a 'Would You Rather' question."),
  category: CommandCategory.Fun,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const response = await axios.get('https://api.popcat.xyz/wyr');
    const { ops1, ops2 } = response.data;

    const embed = new EmbedBuilder()
      .setTitle('Would You Rather...')
      .setDescription(`**Options:**\n\n:one: ${ops1}\n:two: ${ops2}`)
      .setColor('Random')
      .setTimestamp();

    const message = await interaction.editReply({ embeds: [embed] });

    await message.react('1️⃣');
    await message.react('2️⃣');
  },
} as Command;
