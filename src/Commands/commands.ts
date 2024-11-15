import { Command } from "@/types";
import balance from "./Economy/balance";
import ping from "./Fun/ping";
import avatar from "./Utility/avatar";
import help from "./Utility/help";
import id from "./Utility/id";
import invite from "./Utility/invite";
import test from "./Utility/test";
import user from "./Utility/user";
import hello from "./Fun/hello";
import pay from "./Economy/pay";
import modifymoney from "./Economy/modifymoney";
import deposit from "./Economy/deposit";
import withdraw from "./Economy/withdraw";
import error from "./Utility/error";
import ban from "./Moderation/ban";
import kick from "./Moderation/kick";
import setupWelcomer from "./Utility/setup-welcomer";

const globalCommands: Command[] = [
  hello,
  help,
  avatar,
  ping,
  id,
  invite,
  user,
  balance,
  pay,
  deposit,
  withdraw,
  error,
  ban,
  kick,
  setupWelcomer,
];
const devCommands: Command[] = [test, modifymoney];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
