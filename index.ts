import express, { Express } from 'express';
import { Environment } from './src/environment';
import { router } from './src/routes';

const app: Express = express();
app.use('/', express.json(), router);


app.listen(Environment.env.PORT, () => {
    console.log(`Server is listening on port ${Environment.env.PORT}`);
});