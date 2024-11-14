import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsString,
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

export enum CommandCategory {
  Fun = "fun",
  Utility = "utility",
  Moderation = "moderation",
  Economy = "economy",
  Dev = "dev",
  Admin = "admin",
  Giveaway = "giveaway",
  Image = "image",
  Extra = "extra",
  Games = "games",
}

export type Command = {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  run: (props: SlashCommandProps) => Promise<void>;
  options?: CommandOptions;
  category: CommandCategory;
};

export interface LogProps {
  prefix: string;
  message: string;
  color: Colors;
}

export interface EmojisType {
  Success: string;
  Failed: string;
  Loading: string;
  Money: string;
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
  emoji?: any;
}
export interface Event {
  name: keyof ClientEvents;
  once: boolean;
  execute: Function;
}

export type Config = {
  devGuildIds: string[];
  devUserIds: string[];
  clientID: number;
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

export type Storage = Record<string, any>;

export interface DatabaseType {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  deleteAll(): Promise<void>;
  size(): Promise<number>;
  keys(): Promise<string[]>;
  values(): Promise<any[]>;
  toJSON(): Promise<Storage>;
  fromJSON(json: Storage): Promise<void>;
}
export enum TransactionType {
  Wallet = "wallet",
  Bank = "bank",
}

export enum ActionType {
  Add = "add",
  Reduce = "reduce",
  Set = "set",
}
