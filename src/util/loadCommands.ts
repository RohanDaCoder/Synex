import client from '..';
import commands from '../commands/commands';
import config from '../config';
import log from './log';

/**
 * Loads commands
 */
export default async function loadCommands() {
	if (!commands.allCommands || commands.allCommands.length === 0) {
		log('ERROR', 'No Commands found. Terminating...');
		await client.destroy();
		process.exit(1);
	}
	log('INFO', `Loading ${commands.allCommands.length} Commands`);
	if (!client.application) {
		log('ERROR', 'Client Application not found!');
		process.exit(1);
	}

	// GLOBAL COMMANDS
	const globalCommandData = commands.globalCommands.map((command) =>
		command.data.toJSON(),
	);
	await client.application.commands.set(globalCommandData);

	// DEVELOPER COMMANDS
	const devCommandData = commands.devCommands.map((command) =>
		command.data.toJSON(),
	);
	config.devGuildIds.forEach(async (guildID) => {
		const guild = await client.guilds.fetch(guildID);
		if (!guild) return log('WARN', `Guild ${guildID} not found. Skipping...`);
		await guild.commands.set(devCommandData);
	});

	log('INFO', 'Loaded Commands');
}
