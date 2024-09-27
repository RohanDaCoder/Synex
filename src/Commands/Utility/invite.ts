import { Command, CommandCategory } from "../../types";

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  EmbedBuilder,
  InteractionContextType,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the bot's invite link")
    .setContexts(InteractionContextType.Guild),
  category: CommandCategory.Utility,
  run: async ({ interaction, client }) => {
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot`;

    const button = new ButtonBuilder()
      .setLabel("Invite Link")
      .setURL(inviteLink)
      .setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    const inviteEmbed = new EmbedBuilder()
      .setTitle("Invite Me!")
      .setDescription(`Invite ${client.user?.username} Using The Button Below`)
      .setColor("Blurple")
      .setTimestamp()
      .setAuthor({
        name: `${client.user?.username}`,
        iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
      });

    await interaction.reply({
      embeds: [inviteEmbed],
      components: [row],
    });
  },
} as Command;
