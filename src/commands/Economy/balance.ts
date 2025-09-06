import {
	SlashCommandBuilder,
	InteractionContextType,
	EmbedBuilder,
	ChatInputCommandInteraction,
	User,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import { formatMoney } from '@/utils/formatMoney';
import { db } from '@/index';

export default {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription("Displays a user's balance.")
		.setContexts(InteractionContextType.Guild)
		.addUserOption((o) =>
			o
				.setName('user')
				.setDescription('Pick The User You Want To See Balance Of.')
				.setRequired(false),
		),
	category: CommandCategory.Economy,
	run: async ({ interaction }) => {
		const target = interaction.options.getUser('user') || interaction.user;

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

		const [wallet, bank] = await Promise.all([
		db.get(`wallet_${user.id}`),
		db.get(`bank_${user.id}`),
	]);
	const walletValue = wallet ?? 0;
	const bankValue = bank ?? 0;

	const balanceEmbed = new EmbedBuilder()
		.setTitle('Balance')
		.setAuthor({
			name: user.tag,
			iconURL: user.displayAvatarURL({ forceStatic: true }),
		})
				.addFields(
			{ name: 'Wallet', value: formatMoney(walletValue) },
			{ name: 'Bank', value: formatMoney(bankValue) },
		)
		.setColor('Random')
		.setTimestamp();

	if (interaction.replied) {
		await interaction.followUp({ embeds: [balanceEmbed] });
	} else {
		await interaction.editReply({ embeds: [balanceEmbed] });
	}
}
