import type { LogType } from '../types';
import colors, { bold, gray, reset, whiteBright } from 'yoctocolors';

/**
 * A custom log function
 * @param {LogType} logType Log type (info, warn, error, todo)
 * @param {string} message The message you want to print
 */
function log(logType: LogType, message: string) {
	let applyColorBasedOnType: Function;
	switch (logType) {
		case 'INFO':
			applyColorBasedOnType = colors.bgCyan;
			break;
		case 'ERROR':
			applyColorBasedOnType = colors.bgRed;
			break;
		case 'WARN':
			applyColorBasedOnType = colors.bgYellow;
			break;
		case 'TODO':
			applyColorBasedOnType = colors.bgMagenta;
			break;
		default:
			throw new TypeError('Invalid type provided in log function');
			break;
	}
	const paddedLogType = ` ${logType} `;
	const timestamp = new Date().toLocaleTimeString([], {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	// oxlint-disable-next-line no-console
	console.log(
		bold(
			whiteBright(
				applyColorBasedOnType(paddedLogType) +
					' ' +
					gray(timestamp) +
					reset(' | ' + message),
			),
		),
	);
}

export default log;
