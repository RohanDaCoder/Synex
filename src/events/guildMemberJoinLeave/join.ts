import { Event, GatewayEventType } from '@/types';
import { handleGatewayEvent } from '@/utils/handleGatewayEvent';
import { updateAllServerStats } from '@/utils/updateServerStats';
import { Events, GuildMember } from 'discord.js';

const joinEvent: Event = {
	name: Events.GuildMemberAdd,
	once: false,
	execute: async (member: GuildMember) => {
		handleGatewayEvent(member, GatewayEventType.Welcome);
		await updateAllServerStats();
	},
};
export default joinEvent;