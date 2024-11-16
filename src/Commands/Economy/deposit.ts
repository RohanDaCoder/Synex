import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandCategory } from '../../types';
import { db } from '@/index';
import sendMessage from '@/utils/sendMessage';
import { showBalance } from './balance';
import { Emojis } from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setName('deposit')
		.setDescription('Deposit a specific amount of money into your bank.')
		.setContexts(InteractionContextType.Guild)
		.addIntegerOption((option) =>
			option
				.setName('amount')
				.setDescription('Amount of money to deposit.')
				.setRequired(true)
				.setMinValue(1),
		),
	category: CommandCategory.Economy,
	run: async ({ interaction }) => {
		const amount = interaction.options.getInteger('amount')!;
		const userId = interaction.user.id;

		const walletBalance: number = (await db.get(`wallet_${userId}`)) ?? 0;

		if (walletBalance < amount) {
			return sendMessage({
				interaction,
				message:
					"Insufficient funds. You don't have enough money in your wallet to deposit this amount.",
				emoji: 'No',
			});
		}

		const bankBalance: number = (await db.get(`bank_${userId}`)) ?? 0;
		await db.set(`wallet_${userId}`, walletBalance - amount);
		await db.set(`bank_${userId}`, bankBalance + amount);

		await sendMessage({
			interaction,
			message: `Successfully deposited ${amount} into your bank.`,
			emoji: Emojis.Success,
		});

		await showBalance(interaction.user, interaction);
	},
} as Command;
