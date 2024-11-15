import { Event } from "../types";
import runCommand from "./interactionCreate/runCommand";
import consoleLog from "./ready/consoleLog";
import joinEvent from "./welcomeSystem/join";
import leaveEvent from "./welcomeSystem/leave";

const events: Event[] = [runCommand, consoleLog, joinEvent, leaveEvent];

export default events;
