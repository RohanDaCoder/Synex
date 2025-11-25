import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '../../types';
import { db } from '@/index';
import sendMessage from '@/utils/sendMessage';
import { showBalance } from './balance';
import { Emojis } from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setName('withdraw')
		.setDescription('Withdraws money from your bank.')
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

		const [senderBalanceRaw, walletBalanceRaw] = await Promise.all([
			db.get(`bank_${userId}`),
			db.get(`wallet_${userId}`),
		]);
		const senderBalance: number = senderBalanceRaw ?? 0;
		const walletBalance: number = walletBalanceRaw ?? 0;

		if (senderBalance < amount) {
			return sendMessage({
				interaction,
				message:
					"Insufficient balance. You don't have enough funds to withdraw this amount.",
				emoji: Emojis.Failed,
			});
		}

		await Promise.all([
			db.set(`bank_${userId}`, senderBalance - amount),
			db.set(`wallet_${userId}`, walletBalance + amount),
		]);

		await sendMessage({
			interaction,
			message: `Successfully withdrew ${amount} to your wallet.`,
			emoji: 'Yes',
		});

		await showBalance(interaction.user, interaction);
	},
} as Command;
