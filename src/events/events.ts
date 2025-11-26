import type { Event } from '../types';
import runCommand from './interactionCreate/runCommand';
import ready from './ready/ready';

const events: Event[] = [ready, runCommand];

export default events;
