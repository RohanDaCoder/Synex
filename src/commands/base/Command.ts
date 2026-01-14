import {
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  Client,
  Guild,
  TextBasedChannel,
  GuildMember,
  User,
  AutocompleteInteraction,
  APIInteractionGuildMember,
} from 'discord.js';

export type CommandGroup = 'moderation' | 'utility' | 'info' | 'owner';

export interface CommandOptions {
  cooldown?: number;
  userPermissions?: bigint[];
  botPermissions?: bigint[];
  devOnly?: boolean;
  group?: CommandGroup;
}

export abstract class Command {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly options: CommandOptions;
  abstract data: SlashCommandOptionsOnlyBuilder;

  abstract execute(interaction: CommandContext): Promise<void>;
  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}

export class CommandContext {
  readonly interaction: ChatInputCommandInteraction;
  readonly client: Client;
  readonly guild: Guild | null;
  readonly channel: TextBasedChannel | null;
  readonly member: GuildMember | APIInteractionGuildMember | null;
  readonly user: User;

  constructor(interaction: ChatInputCommandInteraction) {
    this.interaction = interaction;
    this.client = interaction.client;
    this.guild = interaction.guild;
    this.channel = interaction.channel;
    this.member = interaction.member;
    this.user = interaction.user;
  }
}
