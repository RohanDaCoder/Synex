import { Client, Collection } from "discord.js";
import { Config } from "../../types";
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const config: Config = require("../../config");
const devGuildIds = ["1270775006481354822"];
let totalCommands;
async function deployCommands(client: Client, commandDataArray: Array<any>) {
  if (!Array.isArray(commandDataArray)) {
    throw new TypeError("commandDataArray should be an array");
  }

  if (client.isReady()) {
    await handleLoading(client, commandDataArray);
  } else {
    client.once("ready", async () => {
      await handleLoading(client, commandDataArray);
    });
  }
}

async function handleLoading(client: Client, commandDataArray: Array<any>) {
  const validCommands = commandDataArray.filter(
    (cmd) => !cmd.options?.deleted && cmd.name && cmd.description
  );

  const devOnlyCommands = validCommands.filter(
    (cmd) => cmd.options?.devOnly === true
  );
  const globalCommands = validCommands.filter((cmd) => !cmd.options?.devOnly);

  await Promise.all([
    loadDevCommands(client, devOnlyCommands),
    loadGlobalCommands(client, globalCommands),
  ]);
}

async function loadGlobalCommands(client: Client, commands: Array<any>) {
  try {
    await client.application?.commands.set(commands);
    console.log(
      colors.magenta(`[Commands] Loaded ${commands.length} commands.`)
    );
  } catch (error) {
    console.error(
      colors.red("Error loading global application commands.\n"),
      error
    );
  }
}

async function loadDevCommands(client: Client, commands: Array<any>) {
  console.log(config);
  for (const guildId of devGuildIds) {
    try {
      const targetGuild = await client.guilds.fetch(guildId);

      if (!targetGuild) {
        console.warn(
          `Cannot load commands in guild "${guildId}" - guild doesn't exist or client isn't part of the guild.`
        );
        continue;
      }

      await targetGuild.commands.set(commands);
    } catch (error) {
      console.error(
        colors.red(
          `Error loading developer application commands in guild "${guildId}".\n`
        ),
        error
      );
    }
  }
}

module.exports = async (client: Client) => {
  totalCommands = 0;
  const commands = new Collection();
  const commandDataArray = [];
  const commandFiles = fs.readdirSync(path.join(__dirname, "../../commands"), {
    withFileTypes: true,
  });

  for (const file of commandFiles) {
    if (file.isDirectory()) {
      const category = file.name;
      const categoryPath = path.join(__dirname, "../../commands", category);
      const categoryCommandFiles = fs
        .readdirSync(categoryPath)
        .filter((fileName: string) => fileName.endsWith(".js"));

      for (const commandFile of categoryCommandFiles) {
        try {
          const commandPath = path.join(categoryPath, commandFile);
          const command = require(commandPath);
          if (command.data && command.data.name && command.data.description) {
            commands.set(command.data.name, command);
            commandDataArray.push(command.data);
            delete require.cache[require.resolve(commandPath)];
            totalCommands++;
          } else {
            console.error(
              `Command ${commandFile} in category ${category} is missing required properties.`
            );
          }
        } catch (error) {
          console.error(
            `Error loading command ${commandFile} in category ${category}:`,
            error
          );
        }
      }
    }
  }

  try {
    await deployCommands(client, commandDataArray);
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
};
