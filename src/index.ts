import express from 'express';
import * as bodyParser from 'body-parser';
import { clientRouter } from './router';

const app: express.Application = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(clientRouter);

app.get('/', (req, res) => {
    return res.send('Bem-Vindo! a Minha API');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
