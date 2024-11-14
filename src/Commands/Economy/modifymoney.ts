import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ActionType, Command, CommandCategory, TransactionType } from "@/types";
import { db } from "@/index";
import config, { Emojis } from "@/config";
import { formatMoney } from "@/utils/formatMoney";
import sendMessage from "@/utils/sendMessage";

export default {
  data: new SlashCommandBuilder()
    .setName("modifymoney")
    .setDescription("Modify someone's balance")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Action (add, reduce, or set)")
        .addChoices(
          { name: "Add", value: ActionType.Add },
          { name: "Reduce", value: ActionType.Reduce },
          { name: "Set", value: ActionType.Set },
        )
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of money")
        .setRequired(true)
        .setMinValue(0),
    )
    .addStringOption((option) =>
      option
        .setName("transaction_type")
        .setDescription("Type of transaction")
        .addChoices(
          { name: "Wallet", value: TransactionType.Wallet },
          { name: "Bank", value: TransactionType.Bank },
        )
        .setRequired(true),
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to modify balance"),
    )
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("The user ID you want to modify balance"),
    ),
  category: CommandCategory.Economy,
  run: async ({ client, interaction }) => {
    const userId =
      interaction.options.getUser("user")?.id ??
      interaction.options.getString("user_id");

    if (!userId) {
      return await sendMessage({
        interaction,
        message: "Please provide either a user or a user ID.",
        emoji: Emojis.Failed,
      });
    }

    const action = interaction.options.getString("action") as ActionType;
    const amount = interaction.options.getNumber("amount") ?? 0;
    const balanceType = interaction.options.getString(
      "transaction_type",
    ) as TransactionType;

    await interaction.deferReply();
    const currentBalance = (await db.get(`${balanceType}_${userId}`)) ?? 0;

    let newBalance;
    switch (action) {
      case ActionType.Reduce:
        newBalance = currentBalance - amount;
        break;
      case ActionType.Set:
        newBalance = amount;
        break;
      case ActionType.Add:
        newBalance = currentBalance + amount;
        break;
      default:
        return sendMessage({
          interaction,
          message: `Invalid action.`,
          emoji: Emojis.Failed,
        });
    }

    await db.set(`${balanceType}_${userId}`, newBalance);

    const updatedBalance: number =
      (await db.get(`${balanceType}_${userId}`)) ?? 0;

    const user = await client.users.fetch(userId);
    const title = `${action.charAt(0).toUpperCase() + action.slice(1)} ${amount} to ${balanceType.charAt(0).toUpperCase() + balanceType.slice(1)}`;

    const balanceEmbed = new EmbedBuilder()
      .setTitle(title)
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ forceStatic: false }),
      })
      .addFields({
        name: `New ${balanceType.charAt(0).toUpperCase() + balanceType.slice(1)} Balance`,
        value: `${formatMoney(updatedBalance)}`,
      })
      .setColor("Random")
      .setTimestamp();

    await interaction.editReply({ embeds: [balanceEmbed] });
  },
} as Command;
