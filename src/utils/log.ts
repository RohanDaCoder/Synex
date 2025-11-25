import colors from 'colors';
import { LogProps } from '../types';
function log({ prefix, message, color }: LogProps) {
	const timestamp = new Date().toLocaleTimeString([], {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	// eslint-disable-next-line no-console
	console.log(
		`${colors[color](`${prefix}`)} ${colors.gray(`[${timestamp}]`)} ${message}`,
	);
}
export default log;
