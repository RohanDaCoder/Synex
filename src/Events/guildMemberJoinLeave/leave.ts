import { Event, GatewayEventType } from '@/types';
import { handleGatewayEvent } from '@/utils/handleGatewayEvent';
import { updateAllServerStats } from '@/utils/updateServerStats';
import { Events, GuildMember } from 'discord.js';

const leaveEvent: Event = {
	name: Events.GuildMemberRemove,
	once: false,
	execute: async (member: GuildMember) => {
		handleGatewayEvent(member, GatewayEventType.Goodbye);
		updateAllServerStats();
	},
};
export default leaveEvent;
