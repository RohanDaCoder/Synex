import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import {
	Command,
	CommandContext,
	type CommandOptions,
} from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/sendMessage.js';

export class HelpCommand extends Command {
	readonly name = 'help';
	readonly description = 'Show available commands';
	readonly options: CommandOptions = {
		cooldown: 10,
		devOnly: false,
	};

	data = new SlashCommandBuilder()
		.setName(this.name)
		.setDescription(this.description)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option
				.setName('command')
				.setDescription('Specific command to get help for'),
		);

	async execute({ interaction }: CommandContext): Promise<void> {
		const commandName = interaction.options.getString('command');

		if (commandName) {
			await this.showCommandHelp(interaction, commandName);
			return;
		}

		await this.showAllCommands(interaction);
	}

	private async showAllCommands(
		interaction: CommandContext['interaction'],
	): Promise<void> {
		const { commandRegistry } =
			await import('../../../utils/commandRegistry.js');
		const commands = commandRegistry.getAll();

		const moderation = commands
			.filter((c) => c.options.group === 'moderation')
			.map((c) => `/${c.name} - ${c.description}`)
			.join('\n');

		const utility = commands
			.filter((c) => c.options.group === 'utility')
			.map((c) => `/${c.name} - ${c.description}`)
			.join('\n');

		const info = commands
			.filter((c) => c.options.group === 'info')
			.map((c) => `/${c.name} - ${c.description}`)
			.join('\n');

		await sendMessage({
			interaction,
			message: `Bot Commands\n\nModeration\n${moderation}\n\nUtility\n${utility}\n\nInfo\n${info}`,
			emoji: emoji('help'),
			color: 'Blue',
		});
	}

	private async showCommandHelp(
		interaction: CommandContext['interaction'],
		name: string,
	): Promise<void> {
		const { commandRegistry } =
			await import('../../../utils/commandRegistry.js');
		const command = commandRegistry.get(name);

		if (!command) {
			await sendMessage({
				interaction,
				message: `Command /${name} not found`,
				emoji: emoji('failed'),
				color: 'Red',
			});
			return;
		}

		await sendMessage({
			interaction,
			message: `/${command.name}\n${command.description}`,
			color: 'Blue',
		});
	}
}
