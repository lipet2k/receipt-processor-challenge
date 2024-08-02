import { Item, Receipt } from './types';

function calculate_points(receipt: Receipt): number {
    return count_alpha_numeric_characters(receipt.retailer) + calculate_points_for_total(receipt.total) + calculate_items_points(receipt.items) + calculate_purchase_date_points(receipt.purchaseDate) + calculate_purchase_time_points(receipt.purchaseTime);
}

function count_alpha_numeric_characters(retailer: string): number {
    const alpha_numeric_regex : RegExp = new RegExp('/[a-zA-Z0-9]/g');
    const regex_matches : RegExpMatchArray | null = retailer.match(alpha_numeric_regex);

    return regex_matches ? regex_matches.length : 0;
}

function calculate_points_for_total(total: string): number {
    let points: number = 0;

    const dollars_and_cents : string[] = total.split('.');
    const total_cents : number = parseInt(dollars_and_cents[1]);
    
    if (total_cents == 0) {
        points += 50;
    }

    if (total_cents % 25 == 0) {
        points += 25;
    }

    return points;
}

function calculate_items_points(items: Item[]): number {
    let points: number = 0;

    const multiples_of_two = Math.floor(items.length / 2); 
    points += 5 * multiples_of_two;

    for (const item of items) {
        const shortDescription = item.shortDescription;
        if (shortDescription.length % 3 == 0) {
            const price_points_float = parseFloat(item.price) * 0.2;
            points += Math.round(price_points_float);
        }
    }
    return points;
}

function calculate_purchase_date_points(date: string): number {

}

function calculate_purchase_time_points(time: string): number {

}

export { calculate_points };