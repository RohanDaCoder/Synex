import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types";
import { SlashCommandProps } from "commandkit";

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Get My Ping"),

  run: async ({ interaction, client }: SlashCommandProps) => {
    const embed = new EmbedBuilder()
      .addFields({
        name: "Client Ping",
        value: `${client.ws.ping}`,
      })
      .setColor("Blurple")
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
    });
  },
} as Command;
