import { globalCommandHandler, devCommandHandler } from '../index';
import log from './log';

export default async function loadCommands() {
	try {
		const globalLoaded = await globalCommandHandler.loadCommands();
		const devLoaded = await devCommandHandler.loadCommands();

		if (globalLoaded === 0 && devLoaded === 0) {
			log('ERROR', 'No commands were loaded.');
			return;
		}

		const parts = [];
		if (globalLoaded > 0) parts.push(`${globalLoaded} global`);
		if (devLoaded > 0) parts.push(`${devLoaded} dev`);

		log('INFO', `Loaded ${parts.join(' and ')} commands`);
	} catch (error) {
		log('ERROR', `Failed to load commands: ${error}`);
		throw error;
	}
}
