import { Client } from "discord.js";
import loadEvents from "./Utils/loadEvents";
import config from "./config";

const client: Client = new Client({
  intents: ["GuildMembers", "GuildMessages", "MessageContent"],
});
client.login(config.token).then(() => loadEvents());

export default client;
