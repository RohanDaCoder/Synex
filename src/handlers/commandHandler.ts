import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type Client,
	type ChatInputCommandInteraction,
	type RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import type { Command, Config, CommandCategory } from '../types';
import sendMessage from '../util/sendMessage';
import log from '../util/log';
import { getMissingPermissions } from '../util/permissionUtils';
import getEmoji from '../util/getEmoji';
import logCommandUsage from '../util/logCommandUsage';

class CommandHandler {
	private commands: Map<string, Command>;

	constructor(
		commands: Command[],
		private client: Client,
		private config: Config,
		private type: 'global' | 'dev',
	) {
		this.commands = new Map(commands.map((cmd) => [cmd.data.name, cmd]));
	}

	public async loadCommands(): Promise<number> {
		if (this.commands.size === 0) {
			log('WARN', `No ${this.type} commands to load`);
			return 0;
		}

		if (!this.client.application) {
			log('ERROR', 'Client Application not found!');
			process.exit(1);
		}

		const commandData = this.getCommandData();

		try {
			if (this.type === 'global') {
				await this.client.application.commands.set(commandData);
				return commandData.length;
			}

			if (this.config.devGuildIds.length === 0) {
				log(
					'WARN',
					'No dev guild IDs configured. Skipping dev command loading.',
				);
				return 0;
			}

			let loadedGuilds = 0;
			for (const guildId of this.config.devGuildIds) {
				try {
					const guild = await this.client.guilds.fetch(guildId);
					if (!guild) {
						log('WARN', `Bot not in guild ${guildId}. Skipping...`);
						continue;
					}
					await guild.commands.set(commandData);
					log(
						'INFO',
						`Loaded ${commandData.length} dev commands to ${guild.name}`,
					);
					loadedGuilds++;
				} catch (error) {
					log(
						'WARN',
						`Failed to load dev commands to guild ${guildId}: ${error}`,
					);
				}
			}

			if (loadedGuilds === 0) {
				log(
					'ERROR',
					'No valid dev guilds found. Dev commands were not loaded.',
				);
				return 0;
			}

			return commandData.length;
		} catch (error) {
			log('ERROR', `Failed to load ${this.type} commands: ${error}`);
			throw error;
		}
	}

	public async executeCommand(
		interaction: ChatInputCommandInteraction,
	): Promise<void> {
		if (!interaction.isChatInputCommand()) return;

		if (!interaction.guild) {
			return this.sendError(
				interaction,
				'You can only use my commands in a server.',
			);
		}

		if (!interaction.member) {
			return this.sendError(interaction, 'Something went wrong...');
		}

		const command = this.commands.get(interaction.commandName);

		if (!command) {
			return this.sendError(interaction, 'This Command Does Not Exist!');
		}

		if (!(await this.checkPermissions(command, interaction))) return;

		try {
			await command.run({ interaction, client: this.client });
			await logCommandUsage({
				interaction,
				command,
				client: this.client,
				config: this.config,
				success: true,
			});
		} catch (error: any) {
			console.error(error);
			const button = new ButtonBuilder()
				.setCustomId('open_bug_report_modal')
				.setLabel('Report Bug')
				.setStyle(ButtonStyle.Danger);

			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

			await sendMessage({
				interaction,
				message: `There was an error while executing this command! \n\n**Error:** \`${error.message}\``,
				emoji: getEmoji('Failed'),
				components: [row],
				ephemeral: true,
			});
			await logCommandUsage({
				interaction,
				command,
				client: this.client,
				config: this.config,
				success: false,
				error,
			});
		}
	}

	private async checkPermissions(
		command: Command,
		interaction: ChatInputCommandInteraction,
	): Promise<boolean> {
		if (!command.options) return true;

		const { userPermissions, botPermissions } = command.options;

		if (userPermissions && interaction.guild) {
			const member = await interaction.guild.members.fetch(interaction.user.id);
			const missingUserPermissions = getMissingPermissions(
				member,
				userPermissions,
			);

			if (missingUserPermissions.length > 0) {
				this.sendError(
					interaction,
					`You are missing the following permissions to execute this command: ${missingUserPermissions
						.map((perm) => `\`${perm}\``)
						.join(', ')}`,
				);
				return false;
			}
		}

		if (botPermissions && interaction.guild) {
			const botMember = await interaction.guild.members.fetchMe();
			const missingBotPermissions = getMissingPermissions(
				botMember,
				botPermissions,
			);

			if (missingBotPermissions.length > 0) {
				this.sendError(
					interaction,
					`I am missing the following permissions to execute this command: ${missingBotPermissions
						.map((perm) => `\`${perm}\``)
						.join(', ')}`,
				);
				return false;
			}
		}

		return true;
	}

	private sendError(
		interaction: ChatInputCommandInteraction,
		message: string,
	): void {
		sendMessage({
			interaction,
			message,
			emoji: getEmoji('Failed'),
		});
	}

	public getCommand(name: string): Command | undefined {
		return this.commands.get(name);
	}

	public getAllCommands(): Command[] {
		return Array.from(this.commands.values());
	}

	public getCommandsByCategory(category: CommandCategory): Command[] {
		return Array.from(this.commands.values()).filter(
			(command) => command.category === category,
		);
	}

	public getCommandData(): RESTPostAPIApplicationCommandsJSONBody[] {
		return Array.from(this.commands.values()).map((command) =>
			command.data.toJSON(),
		);
	}

	public getCommandCount(): number {
		return this.commands.size;
	}
}

export default CommandHandler;
