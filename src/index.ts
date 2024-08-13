console.clear()
import "dotenv/config";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "fs";
import eventHandler from "./handlers/eventHandler"
import commandHandler from "./handlers/commandHandler";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

export default client;
