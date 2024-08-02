import { Receipt } from './types';

function valid_receipt(receipt: Receipt): boolean {
    const requiredFields = ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'];
    for (const field of requiredFields) {
        if (!receipt[field as keyof Receipt]) {
            return false;
        }
    }
    return true;
}

function valid_retailer(retailer: string): boolean {
    const retailer_regex: RegExp = new RegExp('^[\w\s\-&]+$');

    return !retailer.match(retailer_regex);
}

function valid_purchase_date(purchaseDate: string): boolean {

    // TODO: Check valid date
    return false;
}

function valid_purchase_time(purchaseTime: string): boolean {

    // TODO: Check valid time
    return false;
}

function valid_total(total: string): boolean {
    const total_regex: RegExp = new RegExp('^\d+\.\d{2}$');

    return !total.match(total_regex);
}

function valid_short_description(shortDescription: string): boolean {

    // TODO: FINISH REGEX
    const short_description_regex: RegExp = new RegExp('');

    return !shortDescription.match(short_description_regex);
}

function valid_price(price: string): boolean {
    const price_regex: RegExp = new RegExp('^\d+\.\d{2}$');

    return !price.match(price_regex);
}

export { valid_receipt };