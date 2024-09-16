import { Client } from "discord.js";
import loadEvents from "./Utils/loadEvents";
import config from "./config";
import "dotenv/config";
const client: Client = new Client({
  intents: ["GuildMembers", "GuildMessages", "MessageContent"],
});
client.login(process.env.token).then(() => loadEvents());

export default client;
