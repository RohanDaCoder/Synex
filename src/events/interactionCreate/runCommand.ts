import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { commands } from "../ready/registerCommands";
import type { Command } from "../../types";

export default async (client: Client, interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName) as any | undefined;
  if (!command) {
    return interaction.reply({
      content: ":x: The specified command does not exist.",
      ephemeral: true,
    });
  }

  try {
    await command.run({ interaction, client });
  } catch (error) {
    console.error(`Error while running command: \n${error}`);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(":x: An error occurred while executing this command.")
          .setColor("Red")
          .setFooter({
            text: `Requested By ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          }),
      ],
      ephemeral: true,
    });
  }
};