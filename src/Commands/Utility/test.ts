import { SlashCommandBuilder, InteractionContextType } from "discord.js";
import { Command, CommandCategory } from "../../types";
import { db } from "@/index";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Tests Database")
    .setContexts(InteractionContextType.Guild)
    .addStringOption((o) =>
      o.setName("key").setDescription("Enter Key").setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("value").setDescription("Enter Value").setRequired(true)
    ),
  category: CommandCategory.Utility,
  run: async ({ interaction }) => {
    try {
      const key = interaction.options.getString("key")!;
      const value = interaction.options.getString("value")!;
      await interaction.deferReply();

      await db.set(key, value);
      const fetchedData = await db.get(key);

      if (fetchedData) {
        await interaction.editReply(`Test successful! Data: ${fetchedData}`);
      } else {
        await interaction.editReply("Test failed! Data not found.");
      }
    } catch (error: any) {
      await interaction.editReply(
        `An error occurred while testing the database. ${error.message}`
      );
      console.log(error);
    }
  },
} as Command;
