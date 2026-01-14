import 'dotenv/config';
import { createClient, setupBot, loadCommands } from './bot';
import { config } from './config';
import { logger } from './utils/logger';

async function main(): Promise<void> {
	const client = createClient();
	await loadCommands();

	setupBot(client);

	await client.login(config.discord.token);
}

main().catch((err) => {
	logger.error('Fatal error', err as Error);
	process.exit(1);
});
