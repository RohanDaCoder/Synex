export interface Config {
  devGuildIds: Array<string>;
  devUserIds: Array<string>;
}

import { SlashCommandBuilder, CommandInteraction, Client } from 'discord.js';

export type Command = {
  data: SlashCommandBuilder;
  options?: {
    devOnly?: boolean;
  };
  run: (args: { interaction: CommandInteraction; client: Client }) => Promise<void>;
};