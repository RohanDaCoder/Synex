import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '../../types';
import { db } from '@/index';
import sendMessage from '@/utils/sendMessage';
import { showBalance } from './balance';
import { Emojis } from '@/config';

export default {
  data: new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Withdraw a specific amount of money from your bank.')
    .setContexts(InteractionContextType.Guild)
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Amount of money to withdraw.')
        .setRequired(true)
        .setMinValue(1),
    ),
  category: CommandCategory.Economy,
  run: async ({ interaction }) => {
    const amount = interaction.options.getInteger('amount')!;
    const userId = interaction.user.id;

    const senderBalance: number = (await db.get(`bank_${userId}`)) ?? 0;

    if (senderBalance < amount) {
      return sendMessage({
        interaction,
        message:
          "Insufficient balance. You don't have enough funds to withdraw this amount.",
        emoji: Emojis.Failed,
      });
    }

    const walletBalance: number = (await db.get(`wallet_${userId}`)) ?? 0;
    await db.set(`bank_${userId}`, senderBalance - amount);
    await db.set(`wallet_${userId}`, walletBalance + amount);

    await sendMessage({
      interaction,
      message: `Successfully withdrew ${amount} to your wallet.`,
      emoji: 'Yes',
    });

    await showBalance(interaction.user, interaction);
  },
} as Command;
