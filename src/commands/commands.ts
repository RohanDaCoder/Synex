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
import pickupLine from './Fun/pickup-line';
import imdb from './Fun/imdb';
import fact from './Fun/fact';
import bidenpost from './Image/bidenpost';
import cat from './Image/cat';
import dog from './Image/dog';
import drakememe from './Image/drakememe';
import iphoneAlert from './Image/iphone-alert';
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
import type { Command } from '@/types';
import shutdown from './Utility/shutdown';

const globalCommands: Command[] = [
	iphoneAlert,
	hello,
	help,
	timer,
	drakememe,
	dog,
	accountage,
	avatar,
	nickname,
	ping,
	joke,
	fact,
	id,
	pickupLine,
	imdb,
	invite,
	bidenpost,
	cat,
	user,
	ban,
	kick,
	jail,
	mnm,
	oogway,
	pooh,
	sadcat,
	wanted,
	whowouldwin,
	wouldyourather,
	rename,
];
const devCommands: Command[] = [test, error, shutdown];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
