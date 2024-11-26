import { Emojis } from '@/config';

export function formatMoney(amount: number) {
	const money = Emojis.Money;

	if (amount >= 1e15)
		return `${(amount / 1e15).toFixed(1)} quadrillion ${money}`;
	if (amount >= 1e12) return `${(amount / 1e12).toFixed(1)} trillion ${money}`;
	if (amount >= 1e9) return `${(amount / 1e9).toFixed(1)} billion ${money}`;
	if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)} million ${money}`;
	if (amount >= 1e3) return `${(amount / 1e3).toFixed(1)} thousand ${money}`;

	return `${amount} ${money}`;
}
