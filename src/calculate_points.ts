import { DateTime } from 'luxon';
import { Item, Receipt } from './types';

const TWO_PM: DateTime = DateTime.fromFormat('14:00', 'HH:mm');
const FOUR_PM: DateTime = DateTime.fromFormat('16:00', 'HH:mm');

function calculate_points(receipt: Receipt): number {
    return _count_alpha_numeric_characters(receipt.retailer) + _calculate_points_for_total(receipt.total) + _calculate_items_points(receipt.items) + _calculate_purchase_date_points(receipt.purchaseDate) + _calculate_purchase_time_points(receipt.purchaseTime);
}

function _count_alpha_numeric_characters(retailer: string): number {
    const regexMatches: RegExpMatchArray | null = retailer.match(/[a-zA-Z0-9]/g);
    return regexMatches ? regexMatches.length : 0;
}

function _calculate_points_for_total(total: string): number {
    let points: number = 0;

    const dollarsAndCents: string[] = total.split('.');
    const totalCents: number = parseInt(dollarsAndCents[1]);

    if (totalCents === 0) {
        points += 50;
    }

    if (totalCents % 25 === 0) {
        points += 25;
    }

    return points;
}

function _calculate_items_points(items: Item[]): number {
    let points: number = 0;

    const multiplesOfTwo: number = Math.floor(items.length / 2);
    points += 5 * multiplesOfTwo;

    points += _calculate_unique_items(items);

    for (const item of items) {
        const shortDescription: string = item.shortDescription.trim();
        if (shortDescription.length % 3 === 0) {
            const pricePointsFloat = parseFloat(item.price) * 0.2;
            points += Math.ceil(pricePointsFloat);
        }
    }

    return points;
}

function _calculate_unique_items(items: Item[]): number {
    const set = new Set();

    for (const item of items) {
        set.add(item.shortDescription.toLowerCase());
    }

    if (set.size === items.length) {
        return 5 * items.length;
    }
    return 0;
}

function _calculate_purchase_date_points(purchaseDate: string): number {
    const date: DateTime = DateTime.fromFormat(purchaseDate, 'yyyy-MM-dd');

    if (date.day % 2 === 1) {
        return 6;
    }
    return 0;
}

function _calculate_purchase_time_points(purchaseTime: string): number {
    const time: DateTime = DateTime.fromFormat(purchaseTime, 'HH:mm');

    if (TWO_PM < time && time < FOUR_PM) {
        return 10;
    }
    return 0;
}

export { calculate_points };