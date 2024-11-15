import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Command, CommandCategory } from "@/types";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Fetch a random dog picture"),
  category: CommandCategory.Image,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    const dogImageUrl = response.data.message;

    const dogEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Random Dog Picture")
      .setImage(dogImageUrl)
      .setTimestamp();

    await interaction.editReply({ embeds: [dogEmbed] });
  },
} as Command;
