import { EmbedBuilder } from 'discord.js';
import { ReplyOptions } from '../types';

async function sendMessage(props: ReplyOptions): Promise<void> {
  const {
    interaction,
    ephemeral = false,
    message,
    emoji = null,
    color = 'Red',
  } = props;

  const modifiedMessage = emoji ? `${emoji} ${message}` : message;

  const embed = new EmbedBuilder()
    .setDescription(modifiedMessage)
    .setColor(color)
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
