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
    .setName("kick")
    .setDescription("Kick a user from this server.")
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((o) =>
      o.setName("target").setDescription("The user to kick.").setRequired(true),
    )
    .addStringOption((o) =>
      o
        .setName("reason")
        .setDescription("The reason to kick this user.")
        .setRequired(false),
    )
    .addBooleanOption((o) =>
      o
        .setName("is_silent")
        .setDescription("Should the kick be silent?")
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
        message: "You can't kick yourself.",
        emoji: Emojis.Failed,
      });

    if (!target.kickable)
      return await sendMessage({
        interaction,
        message: "I don't have permission to kick this user.",
        emoji: Emojis.Failed,
      });

    await target
      .send({
        content: `You have been kicked from ${interaction.guild?.name} for: ${reason} by ${interaction.user.tag}.`,
      })
      .catch(() => {});

    await target.kick(`${reason} - Kicked by ${interaction.user.tag}`);

    const kickEmbed = new EmbedBuilder()
      .setAuthor({
        name: target.user.tag,
        iconURL: target.user.displayAvatarURL({ forceStatic: true }),
      })
      .setTitle("User Kicked")
      .setDescription(`${targetOption.tag} has been kicked from the server.`)
      .setColor("#FF0000")
      .setThumbnail(targetOption.displayAvatarURL({ forceStatic: true }))
      .addFields(
        { name: "👤 Kicked User", value: targetOption.tag, inline: true },
        { name: "🆔 User ID", value: targetOption.id, inline: true },
        { name: "📄 Reason", value: reason, inline: true },
        { name: "👮 Kicked By", value: interaction.user.tag, inline: true },
      )
      .setTimestamp();

    await interaction.followUp({ embeds: [kickEmbed], ephemeral: isSilent });
  },
} as Command;
