import type {
	ChatInputCommandInteraction,
	Client,
	ClientEvents,
	PermissionsString,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export type LogType = 'INFO' | 'ERROR' | 'WARN';

// EVENTS
export interface Event {
	name: keyof ClientEvents;
	once: boolean;
	execute: (...args: any[]) => any;
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
	emojis: EmojisType;
	devGuildIds: string[];
	devUserIds: string[];
};
export type EmojisType = {
	Success: string;
	Failed: string;
	Loading: string;
	Money: string;
};
