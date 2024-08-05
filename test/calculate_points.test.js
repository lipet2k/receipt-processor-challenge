const MMCornerMarketReceipt = require('./examples/m&m-receipt.json');
const MorningReceipt = require('./examples/morning-receipt.json');
const SimpleReceipt = require('./examples/simple-receipt.json');
const TargetReceipt = require('./examples/target-receipt.json');

const { calculate_points } = require('../src/calculate_points');
const { describe, expect, test } = require('@jest/globals');

describe('calculate_points module', () => {
    describe('points calculation for example receipts', () => {
        test('should correctly calculate points for M&M Corner Market Receipt', () => {
            expect(calculate_points(MMCornerMarketReceipt)).toBe(109);
        });

        test('should correctly calculate points for Morning Receipt', () => {
            expect(calculate_points(MorningReceipt)).toBe(15);
        });

        test('should correctly calculate points for Simple Receipt', () => {
            expect(calculate_points(SimpleReceipt)).toBe(31);
        });

        test('should correctly calculate points for Target Receipt', () => {
            expect(calculate_points(TargetReceipt)).toBe(28);
        });
    });

    describe('points calculation for receipt with empty retailer name', () => {
        test('should correctly calculate points for empty retailer name', () => {
            const TargetCopy = structuredClone(TargetReceipt);
            TargetCopy.retailer = '';

            expect(calculate_points(TargetCopy)).toBe(22);
        });
    });
});
