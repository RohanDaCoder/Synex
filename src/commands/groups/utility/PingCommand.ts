import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandContext, type CommandOptions } from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/index.js';

export class PingCommand extends Command {
  readonly name = 'ping';
  readonly description = 'Check bot latency';
  readonly options: CommandOptions = {
    cooldown: 5,
    devOnly: false,
  };

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .setContexts(InteractionContextType.Guild);

  async execute({ client, interaction }: CommandContext): Promise<void> {
    const latency = Math.round(client.ws.ping);
    await sendMessage({ interaction, message: `Pong! Latency: ${latency}ms`, emoji: emoji('success'), color: 'Green' });
  }
}
