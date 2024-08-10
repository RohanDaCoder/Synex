import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";
import { SlashCommandBuilder } from "discord.js";

export type Command = {
  data: CommandData | SlashCommandBuilder;
  run: (props: SlashCommandProps) => void;
  options?: CommandOptions;
  category?: string;
};
