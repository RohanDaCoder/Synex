import { Emojis } from '@/config';

export function formatMoney(amount: number) {
  const money = Emojis.Money;

  if (amount >= 1e15) return `${(amount / 1e15).toFixed(1)}q ${money}`;
  if (amount >= 1e12) return `${(amount / 1e12).toFixed(1)}t ${money}`;
  if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)}b ${money}`;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}m ${money}`;
  if (amount >= 1e3) return `${(amount / 1e3).toFixed(1)}k ${money}`;

  return `${amount} ${money}`;
}
