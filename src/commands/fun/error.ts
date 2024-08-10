import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('error')
    .setDescription('Command to trigger an error'),
  run: async ({ interaction }) => {
    throw new Error('This is a test error.');
  },
};

export default command;