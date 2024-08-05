const MMCornerMarketReceipt = require('./examples/m&m-receipt.json');
const MorningReceipt = require('./examples/morning-receipt.json');
const SimpleReceipt = require('./examples/simple-receipt.json');
const TargetReceipt = require('./examples/target-receipt.json');

const { valid_receipt } = require('../src/validate');
const { describe, expect, test } = require('@jest/globals');

describe('validate module', () => {
    describe('validate valid example receipts', () => {
        test('should validate example receipts to be true', () => {
            const receipts = [MMCornerMarketReceipt, MorningReceipt, SimpleReceipt, TargetReceipt];

            for (const receipt of receipts) {
                expect(valid_receipt(receipt)).toBe(true);
            }
        });
    });

    describe('validate INVALID receipts', () => {
        test('should validate missing receipt to be false', () => {
            expect(valid_receipt(null)).toBe(false);
        });

        test('should validate missing retailer to be false', () => {
            const missingRetailerReceipt = structuredClone(SimpleReceipt);
            delete missingRetailerReceipt.retailer;

            expect(valid_receipt(missingRetailerReceipt)).toBe(false);
        });

        test('should validate missing items to be false', () => {
            const missingItemsReceipt = structuredClone(SimpleReceipt);
            missingItemsReceipt.items[0] = null;

            expect(valid_receipt(missingItemsReceipt)).toBe(false);
        });


    });

});