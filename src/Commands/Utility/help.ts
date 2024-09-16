import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";
import sendMessage from "../../Utils/sendMessage";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List My Command's Descriptions")
    .setContexts(InteractionContextType.Guild),

  run: async ({ interaction, client }) => {
    sendMessage({
      message: "The Command Is Still In Progress",
      interaction,
      ephemeral: true,
    });
  },
} as Command;
