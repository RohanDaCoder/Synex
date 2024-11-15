import {
  EmbedBuilder,
  InteractionContextType,
  SlashCommandBuilder,
} from "discord.js";
import { CommandCategory, type Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("id")
    .setDescription("Get a User's ID")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((o) =>
      o.setName("target").setDescription("The Target User"),
    ),
  category: CommandCategory.Utility,
  run: async ({ interaction }) => {
    const target = interaction.options.getUser("target") || interaction.user;
    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setAuthor({
        name: target.username,
        iconURL: target.displayAvatarURL({ forceStatic: true }),
      })
      .addFields({
        name: "ID",
        value: `${target.id}`,
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  },
} as Command;
