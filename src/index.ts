import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { handleEvents } from "./handlers/eventHandler";

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

handleEvents(client);

client.login(process.env.TOKEN);
