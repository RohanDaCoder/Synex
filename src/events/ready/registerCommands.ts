import { Client, ApplicationCommandData, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import config from '../../config';

const { devGuildIds } = config;

const commands = new Collection<string, any>();

async function loadCommands(client: Client) {
  const globalCommands: ApplicationCommandData[] = [];
  const devCommands: ApplicationCommandData[] = [];

  const commandFiles = readdirSync(join(__dirname, '../../commands'), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .flatMap(dirent => readdirSync(join(__dirname, '../../commands', dirent.name))
      .filter(file => file.endsWith('.ts'))
      .map(file => join(__dirname, '../../commands', dirent.name, file))
    );

  for (const filePath of commandFiles) {
    try {
      const { default: command }: { default: any } = await import(filePath);
      if (command.data && command.data.name && command.data.description) {
        commands.set(command.data.name, command);
        (command.options?.devOnly ? devCommands : globalCommands).push(command.data.toJSON());
      }
    } catch (error) {
      console.error(`Failed to load command file "${filePath}":`, error);
    }
  }

  await deployCommands(client, globalCommands);
  await deployDevCommands(client, devCommands);
}

async function deployCommands(client: Client, commands: ApplicationCommandData[]) {
  try {
    await client.application?.commands.set(commands);
    console.log(`Deployed ${commands.length} global commands.`);
  } catch (error) {
    console.error('Error deploying global commands:', error);
  }
}

async function deployDevCommands(client: Client, commands: ApplicationCommandData[]) {
  if (!commands.length) return;

  for (const guildId of devGuildIds) {
    try {
      const guild = await client.guilds.fetch(guildId);
      await guild.commands.set(commands);
      console.log(`Deployed ${commands.length} dev commands to guild "${guildId}".`);
    } catch (error) {
      console.error(`Error deploying dev commands to guild "${guildId}":`, error);
    }
  }
}

export { commands };
export default async (client: Client) => {
  try {
    await loadCommands(client);
    console.log('Command handler setup complete.');
  } catch (error) {
    console.error('Error setting up command handler:', error);
  }
};