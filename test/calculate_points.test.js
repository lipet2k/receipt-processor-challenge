const MMCornerMarketReceipt = require('./examples/m&m-receipt.json');
const MorningReceipt = require('./examples/morning-receipt.json');
const SimpleReceipt = require('./examples/simple-receipt.json');
const TargetReceipt =  require('./examples/target-receipt.json');

const { calculate_points } = require('../src/calculate_points');
const { describe, expect, test } = require('@jest/globals');

describe('Test the calculate_points module', () => {
    test('Calculate Points for Example M&M Receipt', () => {
        expect(calculate_points(MMCornerMarketReceipt)).toBe(109);
    });

    test('Calculate Points for Example Morning Receipt', () => {
        expect(calculate_points(MorningReceipt)).toBe(15);
    });

    test('Calculate Points for Example Simple Receipt', () => {
        expect(calculate_points(SimpleReceipt)).toBe(31);
    });

    test('Calculate Points for Example Target Receipt', () => {
        expect(calculate_points(TargetReceipt)).toBe(28);
    });

});