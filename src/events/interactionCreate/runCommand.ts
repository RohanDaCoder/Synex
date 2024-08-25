import { ChatInputCommandInteraction, Events } from "discord.js";
import type { Command, Event } from "../../types";
import { commands } from "../../handlers/commandHandler";
import client from "../../index";
import config from "../../config";
import sendMessage from "../../util/sendMessage";

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName) as Command;

    if (!command) {
      return sendMessage({
        message: "This Command Does Not Exist!",
        interaction,
        emoji: "No",
      });
    }

    if (
      command.options?.devOnly === true &&
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
