import { Command } from "@/types";
import balance from "./Economy/balance";
import ping from "./General/ping";
import avatar from "./Utility/avatar";
import help from "./Utility/help";
import id from "./Utility/id";
import invite from "./Utility/invite";
import test from "./Utility/test";
import user from "./Utility/user";
import hello from "./General/hello";
import pay from "./Economy/pay";
import modifymoney from "./Economy/modifymoney";

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
];
const devCommands: Command[] = [test, modifymoney];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
