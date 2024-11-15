import { SlashCommandBuilder } from "discord.js";
import axios from "axios";
import { Command, CommandCategory } from "@/types";

export default {
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Talk with Synex, your AI companion")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to send to Synex")
        .setRequired(true),
    ),
  category: CommandCategory.Fun,
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const msg = interaction.options.getString("message");
    const model = "gemini-1.5-flash";

    const { username } = interaction.user;
    const nickname = username;

    const context = `
      Your Name Is Lean, A Discord Bot. You are a funny guy who likes to keep conversations light and engaging. 
      Your creator is Rohan (rohan_ohio). You are currently running on an AI command on Lean. 
      You are helpful, friendly, and always ready to assist users with their queries. 
      This user's name is "${username}" (nickname: "${nickname}"). 
      You are interacting on the "${interaction.guild?.name}" server. 
      Server description: "${interaction.guild?.description}". 
      Don't respond with anything written until here. That user's query is: "${msg}"
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}-latest:generateContent?key=${process.env.geminiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: context,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const text = response.data.candidates[0].content.parts[0].text;

    const splitMessage = (message: string) => {
      const chunks = [];
      for (let i = 0; i < message.length; i += 2000) {
        chunks.push(message.slice(i, i + 2000));
      }
      return chunks;
    };

    const chunks = splitMessage(text);

    for (const chunk of chunks) {
      await interaction.followUp(chunk);
    }

    await interaction.deleteReply();
  },
} as Command;
