import {
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
  ChatInputCommandInteraction,
  User,
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
        .setRequired(false),
    ),
  category: CommandCategory.Economy,
  run: async ({ interaction }) => {
    const target = interaction.options.getUser("user") || interaction.user;

    await showBalance(target, interaction);
  },
} as Command;

export async function showBalance(
  user: User,
  interaction: ChatInputCommandInteraction,
) {
  if (!interaction.deferred && !interaction.replied) {
    await interaction.deferReply();
  }

  const wallet = (await db.get(`wallet_${user.id}`)) ?? 0;
  const bank = (await db.get(`bank_${user.id}`)) ?? 0;

  const balanceEmbed = new EmbedBuilder()
    .setTitle("Balance")
    .setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL({ forceStatic: true }),
    })
    .addFields(
      { name: "Wallet", value: formatMoney(wallet) },
      { name: "Bank", value: formatMoney(bank) },
    )
    .setColor("Random")
    .setTimestamp();

  if (interaction.replied) {
    await interaction.followUp({ embeds: [balanceEmbed] });
  } else {
    await interaction.editReply({ embeds: [balanceEmbed] });
  }
}
