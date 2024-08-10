import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export function handleEvents(client: Client) {
  const eventNames = fs.readdirSync(path.resolve(__dirname, "../events"));

  eventNames.forEach(async (name) => {
    const eventFiles = fs.readdirSync(
      path.resolve(__dirname, `../events/${name}`),
    );

    eventFiles.forEach(async (eventFile: string) => {
      const runEvent = require(`../events/${name}/${eventFile}`);
      client.on(name, (...props) => runEvent(client, ...props));
      delete require.cache[require.resolve(`../events/${name}/${eventFile}`)];
    });
  });
}
