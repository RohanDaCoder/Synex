import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	InteractionContextType,
} from 'discord.js';
import {
	Command,
	CommandContext,
	type CommandOptions,
} from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/sendMessage.js';

export class WarnCommand extends Command {
	readonly name = 'warn';
	readonly description = 'Warn a user';
	readonly options: CommandOptions = {
		cooldown: 10,
		userPermissions: [PermissionFlagsBits.ModerateMembers],
		botPermissions: [PermissionFlagsBits.EmbedLinks],
		devOnly: false,
		group: 'moderation',
	};

	data = new SlashCommandBuilder()
		.setName(this.name)
		.setDescription(this.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption((option) =>
			option.setName('user').setDescription('User to warn').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Warn reason').setMaxLength(512),
		);

	async execute({ interaction, guild }: CommandContext): Promise<void> {
		const user = interaction.options.getUser('user', true);
		const reason =
			interaction.options.getString('reason') ?? 'No reason provided';

		await sendMessage({
			interaction,
			message: `${user.tag} has been warned\nReason: ${reason}`,
			emoji: emoji('warn'),
			color: 'Yellow',
		});

		try {
			await user.send(
				`${emoji('warn')} You have been warned in ${guild?.name}\nReason: ${reason}`,
			);
		} catch {
			// User has DMs disabled
		}
	}
}
