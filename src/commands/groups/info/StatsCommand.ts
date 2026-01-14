import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { Command, CommandContext, type CommandOptions } from '../../base/index.js';
import { emoji } from '../../../config/index.js';
import { sendMessage } from '../../../utils/index.js';

export class StatsCommand extends Command {
  readonly name = 'stats';
  readonly description = 'Show bot statistics';
  readonly options: CommandOptions = {
    cooldown: 10,
    devOnly: false,
    group: 'info',
  };

  data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .setContexts(InteractionContextType.Guild);

  async execute({ client, interaction }: CommandContext): Promise<void> {
    const guildCount = client.guilds.cache.size;
    const userCount = client.users.cache.size;
    const channelCount = client.channels.cache.size;
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const ping = Math.round(client.ws.ping);

    await sendMessage({
      interaction,
      message: `Bot Statistics

General
- Servers: ${guildCount}
- Channels: ${channelCount}
- Users: ${userCount}

System
- Uptime: ${this.formatUptime(uptime)}
- Memory: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB
- Latency: ${ping}ms

Version
- discord.js: v14
- Bun: ${process.versions.bun ?? 'unknown'}`,
      emoji: emoji('info'),
      color: 'Blue',
    });
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }

    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }

    return `${secs}s`;
  }
}
