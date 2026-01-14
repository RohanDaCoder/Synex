import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { ReadyHandler, InteractionHandler, ErrorHandler } from './events';
import { commandRegistry } from './utils/commandRegistry';
import { logger } from './utils/logger';
import { config } from './config';

export async function loadCommands(): Promise<void> {
	const { PingCommand, HelpCommand } =
		await import('./commands/groups/utility');
	const { BanCommand, KickCommand, MuteCommand, WarnCommand, PurgeCommand } =
		await import('./commands/groups/moderation');
	const { StatsCommand } = await import('./commands/groups/info');

	commandRegistry.register(new PingCommand());
	commandRegistry.register(new HelpCommand());
	commandRegistry.register(new BanCommand());
	commandRegistry.register(new KickCommand());
	commandRegistry.register(new MuteCommand());
	commandRegistry.register(new WarnCommand());
	commandRegistry.register(new PurgeCommand());
	commandRegistry.register(new StatsCommand());
}

export function createClient(): Client {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMembers,
		],
	});

	return client;
}

export async function syncCommands(_client: Client): Promise<void> {
	const rest = new REST({ version: '10' }).setToken(config.discord.token);

	const commands = commandRegistry.getAll().map((cmd) => cmd.data.toJSON());

	try {
		await rest.put(Routes.applicationCommands(config.discord.applicationId), {
			body: commands,
		});

		logger.success(`Synced ${commandRegistry.size} commands`);
	} catch (error) {
		logger.error('Failed to sync commands', error as Error);
	}
}

export function setupBot(client: Client): void {
	client.on('clientReady', async () => {
		await new ReadyHandler().execute(client);
	});

	client.on('interactionCreate', (interaction) => {
		if (interaction.isChatInputCommand()) {
			new InteractionHandler().execute(interaction);
		}
	});

	client.on('error', (error) => new ErrorHandler().execute(error));
}
