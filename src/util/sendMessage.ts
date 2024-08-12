import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default async (
  message: string,
  interaction: ChatInputCommandInteraction,
  ephemeral?: boolean
) => {
  const IsEphemeral = ephemeral || false;
  const embed = new EmbedBuilder()
    .setDescription(message)
    .setColor("Blurple")
    .setTimestamp();
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      embeds: [embed],
    });
    return;
  }
  await interaction.reply({
    embeds: [embed],
  });
};
