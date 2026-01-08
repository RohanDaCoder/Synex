import { Client } from 'discord.js';
import 'dotenv/config';
import log from './util/log';
import loadEvents from './util/loadEvents';
import allCommands from './commands/commands';
import commandHandler from './handlers/commandHandler';
import config from './config';
import { CommandCategory } from './types';

const client = new Client({
	intents: ['Guilds', 'GuildMessages'],
});

const globalCommands = allCommands.filter(
	(cmd) => cmd.category !== CommandCategory.Dev,
);
const devCommands = allCommands.filter(
	(cmd) => cmd.category === CommandCategory.Dev,
);

export const globalCommandHandler = new commandHandler(
	globalCommands,
	client,
	config,
	'global',
);

export const devCommandHandler = new commandHandler(
	devCommands,
	client,
	config,
	'dev',
);

log('INFO', 'Starting...');
client.login(process.env.token).then(async () => {
	await loadEvents();
});
export default client;
