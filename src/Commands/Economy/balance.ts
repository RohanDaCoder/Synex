import {
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
} from "discord.js";
import { Command, CommandCategory } from "@/types";
import db from "@/utils/database";
import { formatMoney } from "@/utils/formatMoney";

export default {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check Someone's Balance")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((o) =>
      o
        .setName("user")
        .setDescription("Pick The User You Want To See Balance Of.")
        .setRequired(false)
    ),
  category: CommandCategory.Economy,
  run: async ({ interaction, client }) => {
    await interaction.deferReply();
    let target = interaction.options.getUser("user") || interaction.user;
    let wallet = await db.get(`wallet_${target.id}`);
    if (wallet === null) wallet = 0;

    let bank = await db.get(`bank_${target.id}`);
    if (bank === null) bank = 0;

    const balanceEmbed = new EmbedBuilder()
      .setTitle("Balance")
      .setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL({ forceStatic: true }),
      })
      .addFields(
        {
          name: "Wallet",
          value: formatMoney(wallet),
        },
        {
          name: "Bank",
          value: formatMoney(bank),
        }
      )
      .setColor("Random")
      .setTimestamp();

    await interaction.editReply({ embeds: [balanceEmbed] });
  },
} as Command;
