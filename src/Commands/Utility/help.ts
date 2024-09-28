import {
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  InteractionCollector,
} from "discord.js";
import { CommandCategory, type Command } from "../../types";
import commands from "../index";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List My Command's Descriptions"),
  run: async ({
    interaction,
  }: {
    interaction: ChatInputCommandInteraction;
  }) => {
    const categories: {
      fun: Command[];
      utility: Command[];
      economy: Command[];
    } = {
      fun: [],
      utility: [],
      economy: [],
    };

    const allCommands = commands.allCommands;
    allCommands.forEach((command) => {
      const category = command.category;
      if (category in categories) {
        categories[category as keyof typeof categories].push(command);
      }
    });

    const buttonNames: Record<string, string> = {
      fun: "🎉 Fun",
      utility: "🛠️ Utility",
      moderation: "🛡️ Moderation",
      economy: "💰 Economy",
      admin: "⚠️ Admin",
      dev: "🗿 Developer",
      giveaway: "🎁 Giveaway",
      image: "📷 Image Manipulation",
      extra: "📭 Extra",
      games: "🎮 Games",
    };

    const selectOptions = Object.keys(categories).map((category) => {
      const label = buttonNames[category] || category;
      return new StringSelectMenuOptionBuilder()
        .setLabel(label)
        .setValue(category);
    });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("help_select_menu")
      .setPlaceholder("Select a category")
      .addOptions(selectOptions);

    const initialEmbed = new EmbedBuilder()
      .setTitle("Help Menu")
      .setDescription("Select a category to see the commands")
      .setColor("#0099ff");

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectMenu
    );

    await interaction.reply({
      embeds: [initialEmbed],
      components: [row],
      ephemeral: false,
    });

    const filter = (i: any) =>
      i.customId === "help_select_menu" && i.user.id === interaction.user.id;

    const collector = new InteractionCollector(interaction.client, {
      filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      const category = i.values[0] as keyof typeof categories;
      const categoryCommands = categories[category];
      await i.deferUpdate();

      const embed = new EmbedBuilder()
        .setTitle(`Commands in ${buttonNames[category] || category} category`)
        .setDescription(
          categoryCommands
            .map((cmd) => `**/${cmd.data.name}** - ${cmd.data.description}`)
            .join("\n") || "No commands found in this category."
        )
        .setColor("#0099ff");

      await i.editReply({
        embeds: [embed],
        ephemeral: false,
      });
    });

    collector.on("end", (_, reason) => {
      if (reason === "time") {
        interaction.editReply({
          content: "The Command has timed out.",
          components: [],
          embeds: [],
        });
      }
    });
  },
  category: CommandCategory.Fun,
} as Command;
