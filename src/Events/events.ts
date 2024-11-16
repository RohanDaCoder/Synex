import { Event } from '../types';
import runCommand from './interactionCreate/runCommand';
import consoleLog from './ready/consoleLog';
import joinEvent from './guildMemberJoinLeave/join';
import leaveEvent from './guildMemberJoinLeave/leave';

const events: Event[] = [runCommand, consoleLog, joinEvent, leaveEvent];

export default events;
