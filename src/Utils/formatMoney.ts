import config from "@/config";

export function formatMoney(amount: number) {
  if (amount >= 1e9) {
    return `${(amount / 1e9).toFixed(1)}b ${config.emojis.money}`;
  } else if (amount >= 1e6) {
    return `${(amount / 1e6).toFixed(1)}m ${config.emojis.money}`;
  } else if (amount >= 1e3) {
    return `${(amount / 1e3).toFixed(1)}k ${config.emojis.money}`;
  } else {
    return `${amount} ${config.emojis.money}`;
  }
}
