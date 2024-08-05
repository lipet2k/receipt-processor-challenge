const MMCornerMarketReceipt = require('./examples/m&m-receipt.json');
const MorningReceipt = require('./examples/morning-receipt.json');
const SimpleReceipt = require('./examples/simple-receipt.json');
const TargetReceipt = require('./examples/target-receipt.json');

const express = require('express');
const request = require('supertest');
const { router } = require('../src/routes');
const { describe, expect, test, beforeAll } = require('@jest/globals');

describe('routes module', () => {
    const app = express();

    beforeAll(() => {
        app.use('/', express.json(), router);
    });

    describe('router setup', () => {
        test('router should be defined', () => {
            expect(router).toBeDefined();
        });
    });

    describe('process valid receipt', () => {
        test('should add valid receipts to memory dictionary', async () => {
            const receipts = [MMCornerMarketReceipt, MorningReceipt, SimpleReceipt, TargetReceipt];

            for (const receipt of receipts) {
                const response = await request(app)
                    .post('/receipts/process')
                    .send(receipt)
                    .expect(200);

                expect(response.body).toHaveProperty('id');
            }

        });
    });

    describe('process invalid receipt', () => {
        test('should NOT add invalid receipt to memory dictionary', async () => {
            const MMCopy = structuredClone(MMCornerMarketReceipt);
            MMCopy.total = "-100.00"
            const response = await request(app)
                .post('/receipts/process')
                .send(MMCopy)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('get points for receipt id', () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post('/receipts/process')
                .send(MorningReceipt)
                .expect(200);

            id = response.body.id;
        });

        test('should retreive points for an existing receipt', async () => {
            const response = await request(app)
                .get(`/receipts/${id}/points`)
                .expect(200);

            expect(response.body).toHaveProperty('points');
        });

        test('should NOT retreive a missing receipt id', async () => {
            const response = await request(app)
                .get(`/receipts/${'57eb64d9-ae49-4399-93e5-a54efa81bb8c'}/points`)
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });
    });

});