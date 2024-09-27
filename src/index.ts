import { Client } from "discord.js";
import loadEvents from "./Utils/loadEvents";
import { token } from "../token.json";
const client: Client = new Client({
  intents: ["GuildMembers", "GuildMessages", "MessageContent"],
});
client.login(token).then(() => loadEvents());

export default client;
