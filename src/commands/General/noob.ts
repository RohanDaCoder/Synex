import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("noob")
    .setDescription("Replies With Noob")
    .setDMPermission(false),

  run: async ({ interaction, client }) => {
    await interaction.reply({
      content: `Hey Noob :rofl:, ${interaction.user.displayName}!`,
    });
  },
  options: {
    devOnly: true,
  },
} as Command;
