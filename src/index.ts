import { Client, IntentsBitField } from 'discord.js';
import loadEvents from './utils/loadEvents';
import { Database } from 'calm.db';
import config from './config';
import 'dotenv/config';
import log from './utils/log';

const client: Client = new Client({
	intents: [
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildModeration,
		IntentsBitField.Flags.Guilds,
	],
});

client.login(process.env.token).then(() => loadEvents());
const db = new Database(`${config.clientID}_data.json`);

process.on('SIGINT', async () => {
	await log({
		prefix: 'Info',
		message: 'Received SIGINT. Shutting down gracefully.',
		color: 'blue',
	});
	if (client.isReady()) {
		await client.destroy();
	}
	process.exit(0);
});

export default client;
export { db };
