import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("id")
    .setDescription("Get a User's ID")
    .setDMPermission(false)
    .addUserOption((o) =>
      o.setName("target").setDescription("The Target User")
    ),

  run: async ({ interaction, client }) => {
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
