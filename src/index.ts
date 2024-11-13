import { Client } from "discord.js";
import loadEvents from "./utils/loadEvents";
import { token } from "./token.json";
import { Database } from "calm.db";
import config from "./config";

const client: Client = new Client({
  intents: ["GuildMembers", "GuildMessages", "MessageContent"],
});
client.login(token).then(() => loadEvents());
const db = new Database(`${config.clientID}_data.json`);
export default client;
export { db };
