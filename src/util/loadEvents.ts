import client from '..';
import events from '../events/events';
import log from './log';

/**
 * Loads events
 */
export default async function loadEvents() {
	log('INFO', `Loading ${events.length} Events`);
	events.forEach((event) => {
		if (event.once) {
			client.once(
				event.name,
				async (...args: any) => await event.execute(...args),
			);
		} else {
			client.on(
				event.name,
				async (...args: any) => await event.execute(...args),
			);
		}
	});
}
