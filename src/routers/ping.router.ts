import express, { NextFunction, Request, Response } from 'express';
import { pingHandler } from '../controllers/ping.controller';

const pingRouter = express.Router();


function middleware1(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware 1');
    next(); // Call the next middleware 
}

function middleware2(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware 2');
    next(); // Call the next middleware 
}

pingRouter.get('/ping', middleware1, middleware2, pingHandler); // middleware1 ---> middleware2 ---> pingHandler

export default pingRouter;

