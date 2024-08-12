import "dotenv/config";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function loadEvents() {
  try {
    const eventNames = fs.readdirSync(path.join(__dirname, "events"));

    for (const name of eventNames) {
      const eventFiles = fs.readdirSync(path.join(__dirname, `events/${name}`));

      for (const eventFile of eventFiles) {
        const eventPath = path.join(__dirname, `events/${name}/${eventFile}`);

        try {
          const { default: runEvent } = await import(eventPath);

          if (typeof runEvent === "function") {
            client.on(name as keyof typeof Events, (...props: any[]) =>
              runEvent(client, ...props)
            );
          } else {
            console.error(
              `Event handler in file ${eventFile} is not a function.`
            );
          }
        } catch (importError) {
          console.error(
            `Error importing event file ${eventFile}:`,
            importError
          );
        }
      }
    }
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

loadEvents();

client.login(process.env.TOKEN);

export default client;
