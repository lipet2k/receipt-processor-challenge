import { calculate_points } from './calculate_points';
import express, { Request, Response } from 'express';
import { Receipt } from './types';
import { randomUUID, UUID } from 'crypto';
import { valid_receipt } from './validate';

const router = express.Router();

const receipts: { [id: string]: number } = {};

router.post('/receipts/process', async (req: Request, res: Response) => {
    const receipt: Receipt = req.body;

    if (!valid_receipt(receipt)) {
        return res.status(400).send({ error: 'The receipt is invalid' });
    }

    const id: UUID = randomUUID();
    receipts[id] = calculate_points(receipt);

    res.status(200).send({ id });
});

router.get('/receipts/:id/points', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (!receipts[id]) {
        return res.status(404).send({ error: 'No receipt found for that id' });
    }

    res.status(200).send({ points: receipts[id] });
});

export { router };