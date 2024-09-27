import { SlashCommandBuilder, InteractionContextType } from "discord.js";
import { Command, CommandCategory } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Tests Something")
    .setContexts(InteractionContextType.Guild),
  category: CommandCategory.Utility,
  run: async ({ interaction, client }) => {
    await interaction.reply("Test");
  },
} as Command;
