import type { GuildMember, PermissionsString } from 'discord.js';

export function getMissingPermissions(
	member: GuildMember,
	permissions: PermissionsString | PermissionsString[],
): PermissionsString[] {
	const perms = Array.isArray(permissions) ? permissions : [permissions];
	return perms.filter((perm) => !member.permissions.has(perm));
}
