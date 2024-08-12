import client from "../../index";
import chalk from "chalk";
import log from "../../util/log";
import { Events } from "discord.js";
import { Event } from "../../types";

const consoleLog: Event = {
  name: Events.ClientReady,
  once: true,
  execute() {
    log("Info", `Logged in as ${client.user?.tag}`, chalk.blue);
  },
};

export default consoleLog;
