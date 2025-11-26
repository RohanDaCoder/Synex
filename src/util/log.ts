import type { LogType } from '../types';
import colors, { bold, gray, reset, white } from 'yoctocolors';
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
	}
	const paddedLogType = ` ${logType} `;
	const timestamp = new Date().toLocaleTimeString([], {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	console.log(
		bold(
			white(
				applyColorBasedOnType(paddedLogType) +
					' ' +
					gray(timestamp) +
					reset(' | ' + message),
			),
		),
	);
}

export default log;
