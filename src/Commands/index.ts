import { Command } from "../types";
import hello from "./General/hello";
import ping from "./General/ping";
import avatar from "./Utility/avatar";
import help from "./Utility/help";
import id from "./Utility/id";
import invite from "./Utility/invite";
import user from "./Utility/user";

const globalCommands: Command[] = [hello, help, avatar, ping, id, invite, user];
const devCommands: Command[] = [];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
