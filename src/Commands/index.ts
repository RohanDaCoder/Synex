import { Command } from "@/types";
import balance from "./Economy/balance";
import hello from "./General/hello";
import ping from "./General/ping";
import avatar from "./Utility/avatar";
import help from "./Utility/help";
import id from "./Utility/id";
import invite from "./Utility/invite";
import test from "./Utility/test";
import user from "./Utility/user";

const globalCommands: Command[] = [
  hello,
  help,
  avatar,
  ping,
  id,
  invite,
  user,
  balance,
];
const devCommands: Command[] = [test];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
