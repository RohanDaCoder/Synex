import { Command } from "../../types";

import {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  InteractionContextType,
} from "discord.js";
import sendMessage from "../../Utils/sendMessage";

export default {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription(
      "Fetch a user by mention or ID and display their information"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to fetch")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("The user ID to fetch")
        .setRequired(false)
    )
    .setContexts(InteractionContextType.Guild),

  async run({ interaction, client }) {
    try {
      await interaction.deferReply();

      const userOption = interaction.options.getUser("user");
      const userIdOption = interaction.options.getString("user_id");

      if (!userOption && !userIdOption) {
        return sendMessage({
          message: "Please provide either a user mention or a user ID.",
          interaction,
          emoji: "No",
        });
      }

      let user;
      if (userOption) {
        user = await client.users.fetch(userOption.id);
      } else if (userIdOption) {
        user = await client.users.fetch(userIdOption);
      }

      if (user) {
        const createdAtTimestamp = user.createdTimestamp || "Unknown";
        const createdAtFormatted =
          createdAtTimestamp !== "Unknown"
            ? `${new Date(createdAtTimestamp).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
            : "Unknown";
        const userEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("User Information")
          .setThumbnail(user.displayAvatarURL())
          .addFields(
            { name: "Tag", value: user.tag || "Unknown", inline: true },
            {
              name: "Username",
              value: user.username || "Unknown",
              inline: true,
            },
            {
              name: "Discriminator",
              value: user.discriminator || "Unknown",
              inline: true,
            },
            { name: "ID", value: user.id || "Unknown", inline: true },
            { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
            { name: "Created At", value: createdAtFormatted, inline: true },
            {
              name: "Global Name",
              value: user.globalName || "Unknown",
              inline: true,
            },
            {
              name: "Accent Color",
              value: user.hexAccentColor || "Unknown",
              inline: true,
            }
          )
          .setFooter({
            text: `Requested By ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTimestamp();

        let buttons: ButtonBuilder[] = [];
        if (user.bannerURL()) {
          const bannerButton = new ButtonBuilder()
            .setLabel("Banner URL")
            .setStyle(ButtonStyle.Link)
            .setURL(user.bannerURL()!);
          buttons.push(bannerButton);
        }
        const avatarButton = new ButtonBuilder()
          .setLabel("Avatar URL")
          .setStyle(ButtonStyle.Link)
          .setURL(interaction.user.displayAvatarURL());
        buttons.push(avatarButton);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          ...buttons
        );

        await interaction.editReply({ embeds: [userEmbed], components: [row] });
      } else {
        await sendMessage({
          message: "User not found.",
          interaction,
          ephemeral: false,
          emoji: "No",
        });
      }
    } catch (error: any) {
      console.error(error);
      await sendMessage({
        message: `An error occurrred: ${error.message}`,
        interaction,
        ephemeral: false,
        emoji: "No",
      });
    }
  },
} as Command;