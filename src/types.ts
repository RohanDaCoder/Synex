import { SlashCommandBuilder, CommandInteraction, Client } from "discord.js";

export interface Config {
  devGuildIds: Array<string>;
  devUserIds: Array<string>;
}

export type Command = {
  data: SlashCommandBuilder;
  run: (args: { interaction: CommandInteraction; client: Client }) => Promise<void>;
};
