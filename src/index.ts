console.clear();
import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import eventHandler from "./handlers/eventHandler";
import commandHandler from "./handlers/commandHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);
commandHandler(client);

client.login(process.env.TOKEN);
process.client = client;
export default client;