import { InteractionContextType, SlashCommandBuilder } from 'discord.js';
import { Command, CommandCategory } from '@/types';
import { formatMoney } from '@/utils/formatMoney';
import sendMessage from '@/utils/sendMessage';
import { db } from '@/index';
import { Emojis } from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setContexts(InteractionContextType.Guild)
		.setDescription('Pays a user a specific amount of money.')
		.addIntegerOption((option) =>
			option
				.setName('amount')
				.setDescription('The amount of money to pay')
				.setRequired(true)
				.setMinValue(1),
		)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user you want to pay')
				.setRequired(false),
		)
		.addStringOption((option) =>
			option
				.setName('user_id')
				.setDescription("The user's ID you want to pay")
				.setRequired(false),
		),
	category: CommandCategory.Economy,
	run: async ({ interaction, client }) => {
		const user = interaction.options.getUser('user');
		const userId = interaction.options.getString('user_id');
		const amount = interaction.options.getInteger('amount') ?? 1;
		const senderId = interaction.user.id;

		if (amount <= 0) {
			return sendMessage({
				interaction,
				message: 'Amount must be greater than zero.',
				emoji: Emojis.Failed,
			});
		}

		let target;
		if (user) {
			target = user;
		} else if (userId) {
			try {
				target = await client.users.fetch(userId);
			} catch {
				return sendMessage({
					interaction,
					message: 'The provided User ID is invalid or does not exist.',
					emoji: Emojis.Failed,
				});
			}
		}

		if (!target) {
			return sendMessage({
				interaction,
				message: 'Please provide a valid user or user ID.',
				emoji: Emojis.Failed,
			});
		}

		if (target.id === senderId) {
			return sendMessage({
				interaction,
				message: 'You cannot pay yourself.',
				emoji: Emojis.Failed,
			});
		}

				const [senderBalanceRaw, targetBalanceRaw] = await Promise.all([
			db.get(`wallet_${senderId}`),
			db.get(`wallet_${target.id}`),
		]);
		const senderBalance: number = senderBalanceRaw ?? 0;
		const targetBalance: number = targetBalanceRaw ?? 0;

		if (senderBalance < amount) {
			return sendMessage({
				interaction,
				message: 'You do not have enough balance to complete this transaction.',
				emoji: Emojis.Failed,
			});
		}

		await Promise.all([
			db.set(`wallet_${senderId}`, senderBalance - amount),
			db.set(`wallet_${target.id}`, targetBalance + amount),
		]);

		sendMessage({
			interaction,
			message: `You have successfully paid ${formatMoney(amount)} to ${target.username}.

**Before Transaction:**
- Your Balance: ${formatMoney(senderBalance)}
- ${target.username}'s Balance: ${formatMoney(targetBalance)}

**After Transaction:**
- Your Balance: ${formatMoney(senderBalance - amount)}
- ${target.username}'s Balance: ${formatMoney(targetBalance + amount)}`,
			emoji: Emojis.Success,
		});
	},
} as Command;
