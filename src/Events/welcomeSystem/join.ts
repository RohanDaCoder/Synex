import { Event, GatewayEventType } from '@/types';
import { handleGatewayEvent } from '@/utils/handleGatewayEvent';
import { Events, GuildMember } from 'discord.js';

const joinEvent: Event = {
	name: Events.GuildMemberAdd,
	once: false,
	execute: (member: GuildMember) => {
		handleGatewayEvent(member, GatewayEventType.Welcome);
	},
};
export default joinEvent;
