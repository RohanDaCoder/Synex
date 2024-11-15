import {
  SlashCommandBuilder,
  InteractionContextType,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";
import { Command, CommandCategory } from "../../types";
import sendMessage from "@/utils/sendMessage";
import { Emojis } from "@/config";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from this server.")
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((o) =>
      o.setName("target").setDescription("The user to ban.").setRequired(true),
    )
    .addStringOption((o) =>
      o
        .setName("reason")
        .setDescription("The reason to ban this user.")
        .setRequired(false),
    )
    .addBooleanOption((o) =>
      o
        .setName("is_silent")
        .setDescription("Should the ban be silent?")
        .setRequired(false),
    ),
  category: CommandCategory.Moderation,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const reason =
      interaction.options.getString("reason") ?? "No Reason Provided";
    const targetOption = interaction.options.getUser("target");
    const isSilent = interaction.options.getBoolean("is_silent") ?? false;

    if (!targetOption)
      return await sendMessage({
        interaction,
        message: "That user doesn't exist or couldn't be fetched.",
        emoji: Emojis.Failed,
      });

    const target = await interaction.guild?.members.fetch({
      user: targetOption.id,
      cache: false,
      force: true,
    });

    if (!target)
      return await sendMessage({
        interaction,
        message:
          "The specified user isn't in this server or couldn't be fetched.",
        emoji: Emojis.Failed,
      });

    if (target.id === interaction.user.id)
      return await sendMessage({
        interaction,
        message: "You can't ban yourself.",
        emoji: Emojis.Failed,
      });

    if (!target.bannable)
      return await sendMessage({
        interaction,
        message: "I don't have permission to ban this user.",
        emoji: Emojis.Failed,
      });

    await target
      .send({
        content: `You have been banned from ${interaction.guild?.name} for: ${reason} by ${interaction.user.tag}.`,
      })
      .catch(() => {});

    await target.ban({
      reason: `${reason} - Banned by ${interaction.user.tag}`,
    });

    const banEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
      })
      .setTitle("User Banned")
      .setDescription(`${targetOption.tag} has been banned from the server.`)
      .setColor("#FF0000")
      .setThumbnail(targetOption.displayAvatarURL({ forceStatic: true }))
      .addFields(
        { name: "👤 Banned User", value: targetOption.tag, inline: true },
        { name: "🆔 User ID", value: targetOption.id, inline: true },
        { name: "📄 Reason", value: reason, inline: true },
        { name: "👮 Banned By", value: interaction.user.tag, inline: true },
      )
      .setTimestamp();

    await interaction.followUp({ embeds: [banEmbed], ephemeral: isSilent });
  },
} as Command;
