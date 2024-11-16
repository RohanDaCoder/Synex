import { Config, EmojisType } from './types';

const config: Config = {
	clientID: '1270321720292540446', // The Bot's ID
	devGuildIds: ['1271700025646387221'], // Developer Server IDS
	devUserIds: ['922419431508938773'], // Developer's IDS
};

//Emojis
const Emojis: EmojisType = {
	Success: '<a:true:1270323437419626619>',
	Failed: '<a:false:1270323464884060254>',
	Loading: '<a:loading:1270323480746790923>',
	Money: '<:money:1306229612388552746>',
};
export { Emojis };

export default config;
