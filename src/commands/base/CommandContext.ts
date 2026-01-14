import { ChatInputCommandInteraction } from 'discord.js';

export class CommandContext {
  readonly interaction: ChatInputCommandInteraction;

  constructor(interaction: ChatInputCommandInteraction) {
    this.interaction = interaction;
  }

  get client() {
    return this.interaction.client;
  }

  get guild() {
    return this.interaction.guild;
  }

  get channel() {
    return this.interaction.channel;
  }

  get member() {
    return this.interaction.member;
  }

  get user() {
    return this.interaction.user;
  }

  get commandName() {
    return this.interaction.commandName;
  }

  async reply(content: string): Promise<void> {
    await this.interaction.reply(content);
  }

  async deferReply(ephemeral?: boolean): Promise<void> {
    await this.interaction.deferReply({ ephemeral });
  }

  async followUp(content: string): Promise<void> {
    await this.interaction.followUp(content);
  }

  getOption(name: string) {
    return this.interaction.options.get(name);
  }

  getString(name: string, required?: boolean): string | null {
    return this.interaction.options.getString(name, required);
  }

  getInteger(name: string, required?: boolean): number | null {
    return this.interaction.options.getInteger(name, required);
  }

  getBoolean(name: string, required?: boolean): boolean | null {
    return this.interaction.options.getBoolean(name, required);
  }

  getUser(name: string, required?: boolean) {
    return this.interaction.options.getUser(name, required);
  }

  getMember(name: string) {
    return this.interaction.options.getMember(name);
  }

  getChannel(name: string, required?: boolean) {
    return this.interaction.options.getChannel(name, required);
  }

  getRole(name: string, required?: boolean) {
    return this.interaction.options.getRole(name, required);
  }
}
