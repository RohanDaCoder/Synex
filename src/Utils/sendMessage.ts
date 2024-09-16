import { EmbedBuilder } from "discord.js";
import { ReplyOptions } from "../types";
import config from "../config";

export default async (props: ReplyOptions) => {
  const { interaction, ephemeral = false, message, emoji = null } = props;

  let emojiPrefix = "";

  if (emoji === "No") {
    emojiPrefix = config.emojis.false;
  } else if (emoji === "Yes") {
    emojiPrefix = config.emojis.true;
  }

  const embed = new EmbedBuilder()
    .setDescription(`${emojiPrefix}${message}`)
    .setColor("Red")
    .setTimestamp();

  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      embeds: [embed],
      ephemeral,
    });
  } else {
    await interaction.reply({
      embeds: [embed],
      ephemeral,
    });
  }
};
