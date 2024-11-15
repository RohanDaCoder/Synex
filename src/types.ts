/* eslint-disable no-unused-vars */
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
  ColorResolvable,
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
  color?: ColorResolvable | undefined;
}
export interface Event {
  name: keyof ClientEvents;
  once: boolean;
  execute: (...args: any[]) => any;
}

export type Config = {
  devGuildIds: string[];
  devUserIds: string[];
  clientID: string;
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

export enum TransactionType {
  Wallet = "wallet",
  Bank = "bank",
}

export enum ActionType {
  Add = "add",
  Reduce = "reduce",
  Set = "set",
}
export enum GatewayEventType {
  Welcome = "welcome",
  Goodbye = "goodbye",
}

export interface LogProps {
  prefix: string;
  message: string;
  color: Colors;
}
