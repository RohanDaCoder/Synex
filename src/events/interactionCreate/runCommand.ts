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
    if (
      command.options?.devOnly === true &&
      !config.devUserIds.includes(interaction.user.id)
    )
      return sendMessage(
        `${config.emojis.false} This Command Is Only For Developers!`,
        interaction
      );
    if (!command)
      return sendMessage(
        `${config.emojis.false} This Command Does Not Exist!`,
        interaction
      );

    try {
      await command.run({ interaction, client });
    } catch (error) {
      console.error(error);
      await sendMessage(
        `${config.emojis.false} There was an error while executing this command!`,
        interaction
      );
    }
  },
} as Event;
