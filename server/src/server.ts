import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import * as UserAgent from 'express-useragent';
import path from 'path';

import { application } from '../config/config';
import { initModels } from '../models/init-models';
import { routerApp } from './API/client/routers/init-router';
import { ErrorMiddleware } from './middlewares/error-middleware';
import { SequelizeConnect } from './services/databasse-connect';
import { adminRouterApp } from './API/admin/routers/init-router';
import {clientAppRouter} from "./API/client/routers/clientApp.router";


export const app = express();

export const run = async () => {
    initModels(SequelizeConnect);

    app
        .use(UserAgent.express())
        .use(cors())
        .use(bodyParser.json())
        .use(cookieParser())
        .use(express.json())
        .use('/api', routerApp)
        .use('/api/admin', adminRouterApp)
        .use(express.static(path.join(__dirname, 'public')))
        .use(express.static(path.join(__dirname, 'public/app')))
        .use('/', clientAppRouter)
        .use(ErrorMiddleware)
        .listen(application.port, () => {
            console.log(`Server listening on port = ${ application.port }`);
        });
};