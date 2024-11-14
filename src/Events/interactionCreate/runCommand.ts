import { ChatInputCommandInteraction, Events } from "discord.js";
import type { Command, Event } from "../../types";
import client from "../..";
import sendMessage from "../../utils/sendMessage";
import Commands from "../../commands/commands";
import config, { Emojis } from "../../config";

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = Commands.allCommands.find(
      (cmd) => cmd.data.name === interaction.commandName,
    );

    if (!command) {
      return sendMessage({
        message: "This Command Does Not Exist!",
        interaction,
        emoji: Emojis.Failed,
      });
    }

    if (
      Commands.devCommands.includes(command) &&
      !config.devUserIds.includes(interaction.user.id)
    ) {
      return sendMessage({
        message: "This Command Is Only For Developers!",
        interaction,
        emoji: Emojis.Failed,
      });
    }

    try {
      await command.run({ interaction, client });
    } catch (error) {
      console.error(error);
      await sendMessage({
        message: "There was an error while executing this command!",
        interaction,
        emoji: Emojis.Failed,
      });
    }
  },
} as Event;
