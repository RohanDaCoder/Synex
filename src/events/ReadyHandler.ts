import { Client } from 'discord.js';
import { commandRegistry } from '../utils/commandRegistry';
import { logger } from '../utils/logger';

export class ReadyHandler {
	async execute(client: Client): Promise<void> {
		logger.info(`Logged in as ${client.user?.tag}`);

		const commands = commandRegistry.getAll().map((cmd) => cmd.data.toJSON());

		await client.application?.commands.set(commands);

		logger.success(`Synced ${commandRegistry.size} commands`);
		logger.success(`Loaded 3 events`);
	}
}
