import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsString,
  Collection,
  Events,
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

export type Config = {
  emojis: {
    true: string;
    false: string;
    loading: string;
  };
  devGuildIds: string[];
  devUserIds: string[];
};

export interface Event {
  name: Events;
  once: boolean;
  execute: Function;
}
