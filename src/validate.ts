import { Item, Receipt } from './types';
import { DateTime } from 'luxon';

function valid_receipt(receipt: Receipt): boolean {

    if (!receipt) {
        return false;
    }

    const requiredFields: string[] = ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'];

    for (const field of requiredFields) {
        if (!receipt[field as keyof Receipt]) {
            return false;
        }
    }

    return _valid_retailer(receipt.retailer) && _valid_purchase_date(receipt.purchaseDate) && _valid_purchase_time(receipt.purchaseTime) && _valid_items(receipt.items) && _valid_total(receipt.total);
}

function _valid_retailer(retailer: string): boolean {
    return retailer.match(/^[\w\s\-&]+$/) !== null;
}

function _valid_purchase_date(purchaseDate: string): boolean {
    const date : DateTime = DateTime.fromFormat(purchaseDate, 'yyyy-MM-dd');

    return date.isValid;
}

function _valid_purchase_time(purchaseTime: string): boolean {
    const time : DateTime = DateTime.fromFormat(purchaseTime, 'HH:mm');

    return time.isValid;
}

function _valid_items(items: Item[]): boolean {
    for (const item of items) {
        if (!_valid_item(item)) {
            return false;
        }
    }
    return true;
}

function _valid_item(item: Item): boolean {
    if (!item || !item.shortDescription || !item.price) {
        return false;
    }

    return _valid_short_description(item.shortDescription) && _valid_price(item.price);
}

function _valid_total(total: string): boolean {
    return total.match(/^\d+\.\d{2}$/) !== null;
}

function _valid_short_description(shortDescription: string): boolean {
    return shortDescription.match(/^[\w\s\-]+$/) !== null;
}

function _valid_price(price: string): boolean {
    return price.match(/^\d+\.\d{2}$/) !== null;
}

export { valid_receipt };