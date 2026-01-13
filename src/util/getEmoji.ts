export type EmojiName = 'Success' | 'Failed' | 'Loading' | 'Money';

const emojis = {
	Success: '<a:true:1270323437419626619>',
	Failed: '<a:false:1270323464884060254>',
	Loading: '<a:loading:1270323480746790923>',
	Money: '<:money:1306229612388552746>',
} as const;

function getEmoji(name: EmojiName): string {
	return emojis[name];
}

export default getEmoji;
