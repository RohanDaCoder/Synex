import { SlashCommandBuilder, InteractionContextType } from 'discord.js';
import { type Command, CommandCategory } from '../../types';
import log from '@/util/log';
import sendMessage from '@/util/sendMessage';
import config from '@/config';

export default {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shut me DOWN')
		.setContexts(InteractionContextType.Guild),
	category: CommandCategory.Dev,
	run: async ({ interaction, client }) => {
		const message = `Shutdown initated by ${interaction.user.username}`;
		await sendMessage({
			interaction,
			emoji: config.emojis.Success,
			color: 'Green',
			message,
		});
		await client.destroy();
		log('WARN', message);
		process.exit(0);
	},
} as Command;
