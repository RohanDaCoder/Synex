import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsString,
  Events,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  CommandInteraction,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
  ClientEvents,
} from "discord.js";

export type SlashCommandProps = {
  interaction: ChatInputCommandInteraction;
  client: Client;
};

export interface CommandOptions {
  devOnly?: boolean;
  userPermissions?: PermissionsString | PermissionsString[];
  botPermissions?: PermissionsString | PermissionsString[];
}

export type Command = {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  run: (props: SlashCommandProps) => Promise<void>;
  options?: CommandOptions;
  category?: string;
};

export interface LogProps {
  prefix: string;
  message: string;
  color: Colors;
}

export interface ReplyOptions {
  message: string;
  interaction:
    | CommandInteraction
    | ButtonInteraction
    | StringSelectMenuInteraction
    | UserSelectMenuInteraction
    | RoleSelectMenuInteraction
    | MentionableSelectMenuInteraction
    | ChannelSelectMenuInteraction;
  ephemeral?: boolean;
  emoji?: "Yes" | "No";
}
export interface Event {
  name: keyof ClientEvents;
  once: boolean;
  execute: Function;
}
export type Config = {
  emojis: {
    true: string;
    false: string;
    loading: string;
  };
  devGuildIds: string[];
  devUserIds: string[];
};
export type Colors =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "grey"
  | "bgBlack"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite"
  | "reset"
  | "bold"
  | "dim"
  | "italic"
  | "underline"
  | "inverse"
  | "hidden"
  | "strikethrough"
  | "rainbow"
  | "zebra"
  | "america"
  | "trap"
  | "random"
  | "zalgo"
  | "strip"
  | "stripColors";
