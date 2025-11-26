import { Events, Client } from 'discord.js';
import type { Event } from '../../types';
import log from '../../util/log';
import loadCommands from '../../util/loadCommands';

export default {
	name: Events.ClientReady,
	once: true,
	execute: async (client: Client) => {
		await loadCommands();
		log('INFO', `${client.user?.tag} is online!`);
	},
} as Event<Events.ClientReady>;
