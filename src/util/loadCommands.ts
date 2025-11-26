import client from '..';
import commands from '../commands/commands';
import log from './log';

export default async function () {
	if (!commands.allCommands || commands.allCommands.length === 0) {
		log('ERROR', 'No Commands found. Terminating...');
		await client.destroy();
		process.exit(0);
	}
	log('INFO', `Loading ${commands.allCommands.length} Commands`);
}
