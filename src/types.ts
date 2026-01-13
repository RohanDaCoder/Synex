import type {
	ButtonInteraction,
	ChannelSelectMenuInteraction,
	ChatInputCommandInteraction,
	Client,
	ClientEvents,
	ColorResolvable,
	CommandInteraction,
	MentionableSelectMenuInteraction,
	ModalSubmitInteraction,
	PermissionsString,
	RoleSelectMenuInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
} from 'discord.js';

export type LogType = 'INFO' | 'ERROR' | 'WARN' | 'TODO';

// EVENTS
export interface Event<T extends keyof ClientEvents> {
	name: T;
	once: boolean;
	execute: (...args: ClientEvents[T]) => any;
}

// COMMANDS
export type Command = {
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
	run: (props: SlashCommandProps) => Promise<void>;
	options?: CommandOptions;
	category: CommandCategory;
};
export type SlashCommandProps = {
	interaction: ChatInputCommandInteraction;
	client: Client;
};

export interface CommandOptions {
	userPermissions?: PermissionsString | PermissionsString[] | undefined;
	botPermissions?: PermissionsString | PermissionsString[] | undefined;
}

export enum CommandCategory {
	Fun = 'fun',
	Utility = 'utility',
	Moderation = 'moderation',
	Economy = 'economy',
	Dev = 'dev',
	Admin = 'admin',
	Giveaway = 'giveaway',
	Image = 'image',
	Extra = 'extra',
	Games = 'games',
}

// CONFIG

export type Config = {
	devGuildIds: string[];
	devUserIds: string[];
	usageLogChannelId: string;
	bugReportChannelId: string;
};

export interface ReplyOptions {
	message: string;
	interaction:
		| CommandInteraction
		| ButtonInteraction
		| StringSelectMenuInteraction
		| UserSelectMenuInteraction
		| RoleSelectMenuInteraction
		| MentionableSelectMenuInteraction
		| ChannelSelectMenuInteraction
		| ModalSubmitInteraction;
	ephemeral?: boolean;
	emoji?: string | undefined;
	color?: ColorResolvable | undefined;
	components?: any[] | undefined;
}
