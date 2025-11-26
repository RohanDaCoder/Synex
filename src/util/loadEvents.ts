import client from '..';
import events from '../events/events';
import log from './log';

export default function () {
	log('INFO', 'Loading Events');
	events.forEach((event) => {
		if (event.once) {
			client.once(event.name, (...args: any) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args: any) => event.execute(...args, client));
		}
	});
}
