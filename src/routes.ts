import express, { Request, Response } from 'express';
import { Environment } from './environment.ts';

const router = express.Router();

router.post('/receipts/process', async (req, res) => {
    return;
});

router.post('/receipts/:id/points', async (req, res) => {

});

export { router };