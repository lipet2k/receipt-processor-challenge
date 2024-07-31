import express, { Express } from 'express';
import { Environment } from './src/environment.ts';
import { router } from './src/routes.ts';

const app: Express = express();
app.use('/', router);

app.listen(Environment.env.PORT, () => {
    console.log(`Server is listening on port${Environment.env.PORT}`);
})