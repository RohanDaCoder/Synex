import { Command } from '@/types';
import balance from './Economy/balance';
import ping from './Fun/ping';
import avatar from './Utility/avatar';
import help from './Utility/help';
import id from './Utility/id';
import invite from './Utility/invite';
import test from './Utility/test';
import user from './Utility/user';
import hello from './Fun/hello';
import pay from './Economy/pay';
import modifymoney from './Economy/modifymoney';
import deposit from './Economy/deposit';
import withdraw from './Economy/withdraw';
import error from './Utility/error';
import ban from './Moderation/ban';
import kick from './Moderation/kick';
import setupWelcomer from './Utility/setup-welcomer';
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
import ai from './Fun/ai';

const globalCommands: Command[] = [
  iphoneAlert,
  hello,
  help,
  drakememe,
  dog,
  avatar,
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
  balance,
  pay,
  deposit,
  withdraw,
  error,
  ban,
  kick,
  setupWelcomer,
  jail,
  mnm,
  oogway,
  pooh,
  sadcat,
  wanted,
  whowouldwin,
  wouldyourather,
  ai,
];
const devCommands: Command[] = [test, modifymoney];
const allCommands: Command[] = [...globalCommands, ...devCommands];
export default { globalCommands, devCommands, allCommands };
