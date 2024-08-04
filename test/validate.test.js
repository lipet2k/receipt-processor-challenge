const MMCornerMarketReceipt = require('./examples/m&m-receipt.json');
const MorningReceipt = require('./examples/morning-receipt.json');
const SimpleReceipt = require('./examples/simple-receipt.json');
const TargetReceipt =  require('./examples/target-receipt.json');

const { valid_receipt } = require('../src/validate');
const { describe, expect, test } = require('@jest/globals');

describe('Test the validate module', () => {
    test('Valid Example M&M Receipt', () => {
        expect(valid_receipt(MMCornerMarketReceipt)).toBe(true);
    });

    test('Valid Example Morning Receipt', () => {
        expect(valid_receipt(MorningReceipt)).toBe(true);
    });

    test('Valid Example Simple Receipt', () => {
        expect(valid_receipt(SimpleReceipt)).toBe(true);
    });

    test('Valid Example Target Receipt', () => {
        expect(valid_receipt(TargetReceipt)).toBe(true);
    });
});