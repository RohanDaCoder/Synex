import { InteractionContextType, SlashCommandBuilder } from 'discord.js';
import { CommandCategory, type Command } from '@/types';

export default {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies With Hello')
    .setContexts(InteractionContextType.Guild),
  category: CommandCategory.Fun,
  run: async ({ interaction }) => {
    await interaction.reply({
      content: `Hello, ${interaction.user.displayName}!`,
    });
  },
} as Command;
