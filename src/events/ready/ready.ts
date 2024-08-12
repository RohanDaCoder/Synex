import client from "../../index";
import chalk from "chalk";
import log from "../../util/log";

const consoleLog: any = {
  once: true,
  execute() {
    log("Info", `Logged in as ${client.user?.tag}`, chalk.blue);
  },
};

export default consoleLog;
