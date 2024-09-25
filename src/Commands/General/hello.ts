import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies With Hello")
    .setContexts(InteractionContextType.Guild),

  run: async ({ interaction }) => {
    await interaction.reply({
      content: `Hello, ${interaction.user.displayName}!`,
    });
  },
} as Command;
