import client from '..';
import log from './log';
import Commands from '../commands/commands';
import config from '@/config';

export default async function () {
  if (!Commands.allCommands || Commands.allCommands.length === 0) {
    log({
      prefix: 'Error',
      message: 'Commands not found. Shutting Down',
      color: 'red',
    });
    process.exit(0);
  }

  log({
    color: 'blue',
    prefix: 'Info',
    message: `Loading ${Commands.allCommands.length} Commands`,
  });

  if (!client.application) {
    log({
      prefix: 'Error',
      message: 'Client Application not found. Shutting Down',
      color: 'red',
    });
    process.exit(0);
  }

  const globalCommandData = Commands.globalCommands.map(
    (command) => command.data,
  );

  await client.application.commands.set(globalCommandData);

  log({
    color: 'green',
    prefix: 'Info',
    message: `Successfully loaded ${Commands.globalCommands.length} global commands.`,
  });

  const devCommandData = Commands.devCommands.map((command) => command.data);
  config.devGuildIds.forEach(async (guildID) => {
    const guild = await client.guilds.fetch(guildID);
    if (!guild)
      return log({
        prefix: 'Warning',
        message: `Guild ${guildID} not found. Skipping...`,
        color: 'yellow',
      });
    await guild.commands.set(devCommandData);
  });
  log({
    color: 'green',
    prefix: 'Info',
    message: `Successfully loaded ${Commands.devCommands.length} dev commands.`,
  });
}
