import events from "../Events";
import client from "..";
import log from "../Utils/log";

export default async function () {
  if (!events || events.length === 0) {
    log({
      prefix: "Error",
      message: "Events not found. Shutting Down",
      color: "red",
    });
    process.exit(0);
  }

  if (!client) {
    log({
      prefix: "Error",
      message: "Could Not Access Client. Shutting Down",
      color: "red",
    });
    process.exit(0);
  }

  log({
    color: "blue",
    prefix: "Info",
    message: `Loading ${events.length} Events`,
  });

  events.forEach((event) => {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  });

  log({
    color: "green",
    prefix: "Info",
    message: `Successfully loaded ${events.length} events.`,
  });
}
