import { Client, CommandInteraction } from "discord.js";
import { commands } from "../../handlers/commandHandler";

const { EmbedBuilder } = require("discord.js");

module.exports = async (client: Client, interaction: CommandInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = await commands.get(interaction.commandName);
  if (!command) {
    return interaction.reply({
      content: `:x: The specified command does not exist.`,
      ephemeral: true,
    });
  }

  try {
    await command.run(interaction, client);
  } catch (error: any) {
    console.error(`Error While Running Command: \n${error}`);
    await interaction.channel?.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `:x: An error occurred while executing this command: \n${error.message}`
          )
          .setColor("Red")
          .setFooter({
            text: `Requested By ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          }),
      ],
    });
  }
};
