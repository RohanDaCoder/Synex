import { ChatInputCommandInteraction, Client, Events } from "discord.js";
import type { Command } from "../../types";

//TODO: Return If The User Is Not A Developer

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;
    const client: Client = process.client;

    const command = process.commands.get(interaction.commandName) as Command;

    if (!command) {
      return interaction.reply({
        content: "Command not found.",
        ephemeral: true,
      });
    }

    try {
      await command.run({ interaction, client });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
