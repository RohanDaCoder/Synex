import { ActivityType, Events } from "discord.js";
import { Event } from "../../types";
import loadCommands from "../../Utils/loadCommands";
import client from "../..";
import log from "../../Utils/log";

export default {
  name: Events.ClientReady,
  once: true,
  execute: async () => {
    log({
      color: "blue",
      message: `${client.user?.username} is online!`,
      prefix: "Info",
    });
    loadCommands();
    client.user?.setActivity({
      name: "Development Mode",
      type: ActivityType.Streaming,
    });
  },
} as Event;
