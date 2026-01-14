import { Colors, ChatInputCommandInteraction, MessageActionRowComponent, ActionRowData } from 'discord.js';

export type EmbedColor = keyof typeof Colors;

export interface ReplyOptions {
  interaction: ChatInputCommandInteraction;
  message: string;
  emoji?: string;
  color?: EmbedColor;
  components?: ActionRowData<MessageActionRowComponent>[];
}
