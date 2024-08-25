import { Client } from "discord.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";

export default async (client: Client) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const eventsPath = path.join(__dirname, "../events");
  const eventFolders = fs.readdirSync(eventsPath);

  eventFolders.forEach(async (folder) => {
    const eventFiles = fs.readdirSync(path.join(eventsPath, folder));

    eventFiles.forEach(async (file) => {
      const { execute, once } = (
        await import(path.join(eventsPath, folder, file))
      ).default;

      if (once) {
        client.once(folder, (...args) => execute(...args));
      } else {
        client.on(folder, (...args) => execute(...args));
      }
    });
  });
};
