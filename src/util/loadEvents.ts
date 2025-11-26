import client from '..';
import events from '../events/events';
import log from './log';

export default async function () {
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
