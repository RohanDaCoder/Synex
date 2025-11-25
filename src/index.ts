import { Client, IntentsBitField } from 'discord.js';
import loadEvents from './utils/loadEvents';
import { Database } from 'calm.db';
import config from './config';
import 'dotenv/config';

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

export default client;
export { db };
