import type { Command } from '@/types';

import ping from './Fun/ping';
import avatar from './Utility/avatar';
import help from './Utility/help';
import id from './Utility/id';
import invite from './Utility/invite';
import test from './Utility/test';
import user from './Utility/user';
import hello from './Fun/hello';
import error from './Utility/error';
import ban from './Moderation/ban';
import kick from './Moderation/kick';
import joke from './Fun/joke';
import pickupLine from './Fun/pickupLine';
import imdb from './Fun/imdb';
import fact from './Fun/fact';
import bidenpost from './Image/bidenpost';
import cat from './Image/cat';
import dog from './Image/dog';
import drakememe from './Image/drakememe';
import iphoneAlert from './Image/iphoneAlert';
import jail from './Image/jail';
import mnm from './Image/mnm';
import oogway from './Image/oogway';
import pooh from './Image/pooh';
import sadcat from './Image/sadcat';
import wanted from './Image/wanted';
import whowouldwin from './Fun/whowouldwin';
import wouldyourather from './Fun/wouldyourather';
import nickname from './Moderation/nickname';
import accountage from './Utility/accountage';
import timer from './Utility/timer';
import rename from './Utility/rename';
import shutdown from './Utility/shutdown';

const allCommands: Command[] = [
	// Fun commands
	iphoneAlert,
	hello,
	help,
	timer,
	drakememe,
	dog,
	ping,
	joke,
	fact,
	pickupLine,
	imdb,
	whowouldwin,
	wouldyourather,

	// Utility commands
	accountage,
	avatar,
	id,
	invite,
	user,
	nickname,
	rename,
	timer,

	// Moderation commands
	ban,
	kick,

	// Image commands
	bidenpost,
	cat,
	dog,
	drakememe,
	iphoneAlert,
	jail,
	mnm,
	oogway,
	pooh,
	sadcat,
	wanted,

	// Dev commands
	test,
	error,
	shutdown,
];

export default allCommands;
