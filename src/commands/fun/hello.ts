import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!'),
  run: async ({ interaction }) => {
    await interaction.reply(`Hello, ${interaction.user.username}!`);
  },
  options: {
    devOnly: true,
  }
};

export default command;