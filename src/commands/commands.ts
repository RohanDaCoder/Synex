import type { Command } from '../types';
import ping from './Fun/ping';

const globalCommands: Command[] = [ping];
const devCommands: Command[] = [];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
