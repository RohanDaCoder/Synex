import {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  GuildMember,
  ButtonInteraction,
  MessageComponentInteraction,
} from "discord.js";
import type { Command } from "../../types";
import sendMessage from "../../util/sendMessage";
import config from "../../config";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server.")
    .setDMPermission(false)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for banning the user")
        .setRequired(false)
    ),

  run: async ({ interaction, client }) => {
    const target = interaction.options.getMember("user") as GuildMember;
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (!target) {
      return sendMessage({
        message: "User not found or invalid.",
        interaction,
        ephemeral: true,
        emoji: "No",
      });
    }

    if (!target.bannable) {
      return sendMessage({
        message: "I cannot ban this user.",
        interaction,
        ephemeral: true,
        emoji: "No",
      });
    }

    // Create confirmation buttons
    const confirmButton = new ButtonBuilder()
      .setCustomId("confirm-ban")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
      .setCustomId("cancel-ban")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton
    );

    await sendMessage({
      message: `Are you sure you want to ban ${target.user.tag}?`,
      interaction,
      ephemeral: true,
    });

    await interaction.editReply({
      components: [row],
    });

    const filter = (i: MessageComponentInteraction) =>
      i.customId === "confirm-ban" || i.customId === "cancel-ban";

    const collector = interaction.channel?.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector?.on("collect", async (i) => {
      if (i.customId === "confirm-ban") {
        try {
          await target.ban({ reason });

          const banEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle("User Banned")
            .addFields(
              { name: "Banned User", value: target.user.tag, inline: true },
              { name: "Banned By", value: interaction.user.tag, inline: true },
              { name: "Reason", value: reason }
            )
            .setTimestamp()
            .setFooter({
              text: `User ID: ${target.id}`,
              iconURL: interaction.guild?.iconURL() || "",
            });

          await i.update({
            content: `${config.emojis.true} User successfully banned.`,
            embeds: [banEmbed],
            components: [],
          });
        } catch (error) {
          console.error("Error banning user:", error);
          await sendMessage({
            message: "An error occurred while banning the user.",
            interaction: i,
            ephemeral: true,
            emoji: "No",
          });
        }
      } else if (i.customId === "cancel-ban") {
        await sendMessage({
          message: "Ban action has been canceled.",
          interaction: i,
          ephemeral: true,
          emoji: "No",
        });
      }
    });

    collector?.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.editReply({
          content: "No action was taken.",
          components: [],
        });
      }
    });
  },

  options: {
    devOnly: false,
    userPermissions: ["BanMembers"],
    botPermissions: ["BanMembers"],
  },
} as Command;
