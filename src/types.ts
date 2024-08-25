import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionsString,
  Events,
  CommandInteraction,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
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
