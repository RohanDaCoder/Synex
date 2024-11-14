import { EmbedBuilder } from "discord.js";
import { ReplyOptions } from "../types";

async function sendMessage(props: ReplyOptions): Promise<void> {
  const { interaction, ephemeral = false, message, emoji = null } = props;

  const modifiedMessage = emoji ? `${String(emoji)} ${message}` : message;

  const embed = new EmbedBuilder()
    .setDescription(modifiedMessage)
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
}

export default sendMessage;
