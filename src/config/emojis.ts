export type EmojiKey =
  | 'success'
  | 'failed'
  | 'warning'
  | 'info'
  | 'ban'
  | 'kick'
  | 'mute'
  | 'warn'
  | 'purge'
  | 'arrowUp'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'loading'
  | 'check'
  | 'cross'
  | 'help';

const emojis: Record<EmojiKey, string> = {
  success: '<a:true:1270323437419626619>',
  failed: '<a:false:1270323464884060254>',
  warning: '<:warning_yellow:123456791>',
  info: '<:info_blue:123456792>',
  ban: '<:ban_hammer:123456793>',
  kick: '<:kick_boot:123456794>',
  mute: '<:mute_icon:123456795>',
  warn: '<:warn_sign:123456796>',
  purge: '<:purge_trash:123456797>',
  arrowUp: '<:arrow_up:123456802>',
  arrowDown: '<:arrow_down:123456803>',
  arrowLeft: '<:arrow_left:123456804>',
  arrowRight: '<:arrow_right:123456805>',
  loading: '<a:loading_spinner:123456798>',
  check: '<:check_mark:123456799>',
  cross: '<:cross_x:123456800>',
  help: '<:help_icon:123456801>',
};

export function emoji(key: EmojiKey): string {
  return emojis[key];
}

export { emojis };
