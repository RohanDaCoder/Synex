import {
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
} from "discord.js";
import { Command, CommandCategory } from "@/types";
import { formatMoney } from "@/utils/formatMoney";
import { db } from "@/index";

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
    let wallet: number = (await db.get(`wallet_${target.id}`)) ?? 0;

    let bank: number = (await db.get(`bank_${target.id}`)) ?? 0;

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
