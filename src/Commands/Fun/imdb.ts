import {
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
} from 'discord.js';
import { Command, CommandCategory } from '@/types';
import sendMessage from '@/utils/sendMessage';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('imdb')
    .setDescription('Fetches movie information from IMDb.')
    .setContexts(InteractionContextType.Guild)
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('The movie to search for.')
        .setRequired(true),
    ),
  category: CommandCategory.Fun,

  run: async ({ interaction }) => {
    await interaction.deferReply();
    const query = interaction.options.getString('query')!;
    const apiUrl = `https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.title) {
      return await sendMessage({
        message: `No movie found with that title.`,
        ephemeral: true,
        interaction,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setURL(data.imdburl)
      .setImage(data.poster)
      .setThumbnail(data.poster)
      .setColor('Random')
      .setDescription(data.plot)
      .addFields(
        { name: 'Year', value: data.year.toString(), inline: true },
        { name: 'Rated', value: data.rated, inline: true },
        { name: 'Runtime', value: data.runtime, inline: true },
        { name: 'Genres', value: data.genres, inline: true },
        { name: 'Director', value: data.director, inline: true },
        { name: 'Writer', value: data.writer, inline: true },
        { name: 'Actors', value: data.actors, inline: true },
        { name: 'Languages', value: data.languages, inline: true },
        { name: 'Country', value: data.country, inline: true },
        { name: 'Awards', value: data.awards, inline: true },
        { name: 'Box Office', value: data.boxoffice, inline: true },
        { name: 'IMDb Rating', value: data.rating.toString(), inline: true },
        {
          name: 'Ratings',
          value: data.ratings
            .map((r: { source: any; value: any }) => `${r.source}: ${r.value}`)
            .join('\n'),
          inline: false,
        },
      )
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
} as Command;
