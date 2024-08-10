import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export function handleEvents(client: Client) {
  const eventDirectories = fs.readdirSync(path.resolve(__dirname, '../events'));

  eventDirectories.forEach(async (dirName) => {
    const eventFiles = fs.readdirSync(path.resolve(__dirname, `../events/${dirName}`));

    for (const eventFile of eventFiles) {
      try {
        const { default: eventHandler } = await import(`../events/${dirName}/${eventFile}`);
        
        if (typeof eventHandler === 'function') {
          client.on(dirName, (...props) => eventHandler(client, ...props));
        } else {
          console.error(`Event handler in file ${eventFile} is not a function.`);
        }
      } catch (error) {
        console.error(`Failed to load event handler from file "${eventFile}":`, error);
      }
    }
  });
}