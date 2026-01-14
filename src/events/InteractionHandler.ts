import { ChatInputCommandInteraction } from 'discord.js';
import { commandRegistry } from '../utils/commandRegistry';
import { logger } from '../utils/logger';
import { CommandContext } from '../commands';
import { isDeveloper, isDevMode } from '../validations';
import { cooldownManager } from '../validations/cooldown';
import { emoji } from '../config';
import { sendMessage } from '../utils/sendMessage';

export class InteractionHandler {
	async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const command = commandRegistry.get(interaction.commandName);

		if (!command) {
			await sendMessage({
				interaction,
				message: 'That command does not exist.',
				emoji: emoji('failed'),
				color: 'Red',
			});
			return;
		}

		const commandContext = new CommandContext(interaction);

		if (command.options.devOnly && !isDeveloper(interaction.user.id)) {
			logger.warn(`Unauthorized dev command: ${interaction.commandName}`);
			await sendMessage({
				interaction,
				message: 'Developer only command',
				emoji: emoji('failed'),
				color: 'Red',
			});
			return;
		}

		if (command.options.cooldown && command.options.cooldown > 0) {
			const canUse = cooldownManager.check(
				interaction.user.id,
				command.name,
				command.options.cooldown,
			);

			if (!canUse) {
				const remaining = cooldownManager.getRemaining(
					interaction.user.id,
					command.name,
				);
				await sendMessage({
					interaction,
					message: `Cooldown: ${remaining}s remaining`,
					emoji: emoji('warning'),
					color: 'Yellow',
				});
				return;
			}
		}

		if (isDevMode()) {
			logger.debug(`Executing command: ${command.name}`);
		}

		try {
			await command.execute(commandContext);
		} catch (error) {
			logger.error(`Command error: ${command.name}`, error as Error);
			await sendMessage({
				interaction,
				message: 'An error occurred',
				emoji: emoji('failed'),
				color: 'Red',
			});
		}
	}
}
