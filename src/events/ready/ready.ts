
import client from "../../index";

const consoleLog: any = {
  once: true,
  execute() {
    console.log(`Logged in as ${client.user?.tag}`);
  },
};

export default consoleLog;
