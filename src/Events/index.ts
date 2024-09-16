import { Event } from "../types";
import runCommand from "./interactionCreate/runCommand";
import consoleLog from "./ready/consoleLog";

const events: Event[] = [runCommand, consoleLog];

export default events;
