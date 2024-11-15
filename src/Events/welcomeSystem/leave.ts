import { Event, GatewayEventType } from '@/types';
import { handleGatewayEvent } from '@/utils/handleGatewayEvent';
import { Events, GuildMember } from 'discord.js';

const leaveEvent: Event = {
  name: Events.GuildMemberRemove,
  once: false,
  execute: (member: GuildMember) => {
    handleGatewayEvent(member, GatewayEventType.Goodbye);
  },
};
export default leaveEvent;
