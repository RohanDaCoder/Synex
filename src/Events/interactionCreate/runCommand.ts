import { ChatInputCommandInteraction, Events } from "discord.js";
import type { Command, Event } from "../../types";
import client from "../..";
import sendMessage from "../../Utils/sendMessage";
import Commands from "../../Commands";
import config from "../../config";

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = Commands.allCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );

    if (!command) {
      return sendMessage({
        message: "This Command Does Not Exist!",
        interaction,
        emoji: "No",
      });
    }

    if (
      Commands.devCommands.includes(command) &&
      !config.devUserIds.includes(interaction.user.id)
    ) {
      return sendMessage({
        message: "This Command Is Only For Developers!",
        interaction,
        emoji: "No",
      });
    }

    try {
      await command.run({ interaction, client });
    } catch (error) {
      console.error(error);
      await sendMessage({
        message: "There was an error while executing this command!",
        interaction,
        emoji: "No",
      });
    }
  },
} as Event;
