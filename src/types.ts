import type { CommandData, SlashCommandProps, CommandOptions } from "commandkit";

export type Command = {
  data: CommandData;
  run: (props: SlashCommandProps) => void;
  options?: CommandOptions;
  category?: string;
};