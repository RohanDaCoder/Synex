console.clear();
import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import eventHandler from "./handlers/eventHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.TOKEN);

export default client;
