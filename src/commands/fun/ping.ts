import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  run: async ({ interaction }) => {
    await interaction.reply('Pong!');
  },
};

export default command;