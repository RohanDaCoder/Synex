import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
} from "discord.js";
import path from "path";
import fs from "fs";
import { Command } from "../types";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import log from "../util/log.ts";
import config from "../config";

export default async function commandHandler(client: Client) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const commandsPath = path.join(__dirname, "../commands");
  const commandFolders = fs.readdirSync(commandsPath);
  process.commands = new Collection<string, Command>();

  const globalCommands: ApplicationCommandDataResolvable[] = [];
  const devCommands: ApplicationCommandDataResolvable[] = [];

  log("Info", "Loading commands...", chalk.blue);

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const { default: command } = await import(filePath);

      if (command) {
        command.options?.devOnly
          ? devCommands.push(command.data.toJSON())
          : globalCommands.push(command.data.toJSON());
        process.commands.set(command.data.name, command);
      }
    }
  }

  client.once("ready", async () => {
    try {
      await client.application?.commands.set(globalCommands);

      if (config.devGuildIds.length > 0) {
        for (const guildId of config.devGuildIds) {
          const guild = client.guilds.cache.get(guildId);
          await guild?.commands.set(devCommands);
        }
      }
      log(
        "Info",
        `Registered ${devCommands.length} developer and ${globalCommands.length} global commands.`,
        chalk.green,
      );
    } catch (error) {
      log("Error", `Error registering commands: ${error.message}`, chalk.red);
    }
  });
}
