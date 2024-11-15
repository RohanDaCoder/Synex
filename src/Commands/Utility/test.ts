import { SlashCommandBuilder, InteractionContextType } from "discord.js";
import { Command, CommandCategory, GatewayEventType } from "../../types";
import { handleGatewayEvent } from "@/utils/handleGatewayEvent";
import sendMessage from "@/utils/sendMessage";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Tests Welcome System")
    .setContexts(InteractionContextType.Guild)
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The event to test")
        .setRequired(true)
        .addChoices(
          { name: "Welcome", value: GatewayEventType.Welcome },
          { name: "Goodbye", value: GatewayEventType.Goodbye },
        ),
    ),
  category: CommandCategory.Utility,
  run: async ({ interaction }) => {
    const eventOption = interaction.options.getString(
      "event",
      true,
    ) as GatewayEventType;

    const guildMember = await interaction.guild?.members.fetchMe();
    if (guildMember) {
      await handleGatewayEvent(guildMember, eventOption);
      await sendMessage({
        interaction,
        message: `Tested ${eventOption} event!`,
        color: "Green",
        ephemeral: true,
      });
    } else {
      await sendMessage({
        interaction,
        message: "Unable to fetch the guild member.",
        color: "Red",
        ephemeral: true,
      });
    }
  },
} as Command;
