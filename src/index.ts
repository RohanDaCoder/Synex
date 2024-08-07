import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { handleCommands } from "./handlers/commandHandler";
import { handleEvents } from "./handlers/eventHandler";

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

handleCommands(client);
handleEvents(client);

client.login(process.env.TOKEN);
