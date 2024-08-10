import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies With Hello"),

  run: async ({ interaction, client }) => {
    await interaction.reply({
      content: `Hello, ${interaction.user.displayName}!`,
    });
  },
} as Command;
