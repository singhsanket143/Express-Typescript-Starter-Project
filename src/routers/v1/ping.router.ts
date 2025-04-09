import express from 'express';
import { pingHandler } from '../../controllers/ping.controller';

const pingRouter = express.Router();

pingRouter.get('/', pingHandler); 

pingRouter.get('/health', (req, res) => {
    res.status(200).send('OK');
});

export default pingRouter;

