import {
  EmbedBuilder,
  InteractionContextType,
  SlashCommandBuilder,
} from "discord.js";
import type { Command } from "../../types";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Fetch A User's Or Your Avatar")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) =>
      option.setName("target").setDescription("The Target User"),
    ),

  run: async ({ interaction }) => {
    const target = interaction.options.getUser("target") || interaction.user;
    const targetAvatar = target.displayAvatarURL({ forceStatic: false });
    const embed = new EmbedBuilder()
      .setAuthor({
        name: target.username,
        iconURL: targetAvatar,
      })
      .setTimestamp()
      .setImage(targetAvatar);
    await interaction.reply({
      embeds: [embed],
    });
  },
} as Command;
