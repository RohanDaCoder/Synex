import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";
import sendMessage from "../../util/sendMessage";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List My Command's Descriptions")
    .setDMPermission(false),

  run: async ({ interaction, client }) => {
    sendMessage({
      message: "The Command Is Still In Progress",
      interaction,
      ephemeral: true,
    });
  },
} as Command;
