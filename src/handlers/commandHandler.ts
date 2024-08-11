import { Client, Collection, ApplicationCommandDataResolvable } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { Command } from '../types';
import { fileURLToPath } from 'node:url';

export default async function commandHandler(client: Client) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);
    process.commands = new Collection<string, Command>();
    const commands: ApplicationCommandDataResolvable[] = [];

    commandFolders.forEach(folder => {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.ts'));

        commandFiles.forEach(async file => {
            const filePath = path.join(folderPath, file);
            const { default: command } = await import(filePath);
            if (command) {
                commands.push(command.data.toJSON());
                process.commands.set(command.data.name, command);
            }
        });
    });

    // Wait until all commands are loaded
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Register commands with Discord
    client.once('ready', async () => {
        try {
            await client.application?.commands.set(commands);
            console.log('Successfully registered application commands.');
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    });
}