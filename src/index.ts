import { Client } from 'discord.js';
import 'dotenv/config';
import { bgYellowBright, bold, yellowBright } from 'yoctocolors';
import log from './util/log';
import loadEvents from './util/loadEvents';

const client = new Client({
	intents: ['Guilds', 'GuildMessages'],
});
log('INFO', 'Starting...');
client.login(process.env.token).then(() => loadEvents());
export default client;
