import client from "..";
import log from "./log";
import Commands from "../Commands";

export default async function () {
  if (!Commands.allCommands || Commands.allCommands.length === 0) {
    log({
      prefix: "Error",
      message: "Commands not found. Shutting Down",
      color: "red",
    });
    process.exit(0);
  }

  log({
    color: "blue",
    prefix: "Info",
    message: `Loading ${Commands.allCommands.length} Commands`,
  });

  if (!client.application) {
    log({
      prefix: "Error",
      message: "Client Application not found. Shutting Down",
      color: "red",
    });
    process.exit(0);
  }

  const globalCommandData = Commands.globalCommands.map(
    (command) => command.data,
  );

  await client.application.commands.set(globalCommandData);

  log({
    color: "green",
    prefix: "Info",
    message: `Successfully loaded ${Commands.globalCommands.length} global commands.`,
  });
}
