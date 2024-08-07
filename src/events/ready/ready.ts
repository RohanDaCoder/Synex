import { Client, ActivityType } from "discord.js";

module.exports = async (client: Client) => {
  console.log(`[Client] ${client.user?.tag} Is Ready`);
  client.user?.setPresence({
    activities: [{ name: `You`, type: ActivityType.Watching }],
    status: "online",
  });
};
