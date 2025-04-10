import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import dotenv from 'dotenv';
import indexRouter from "./routes";
import newsRouter from "./routes/news";
import platformsRouter from "./routes/platforms";
import proxyRouter from './routes/proxy';

import {initApis} from "./shared/init";

const app = express();
dotenv.config();
// 初始化 API
initApis();

// 仅在开发环境下启用跨域
// if (process.env.NODE_ENV === 'development') {
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});
// }

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/platforms', platformsRouter);
app.use('/proxy', proxyRouter);
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: {
    locals: { message: any; error: any; };
    status: (arg0: any) => void;
    render: (arg0: string) => void;
}, next: any) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

export = app;
