import express from "express";
import type {Request, Response, NextFunction} from "express"
import {quick} from "../shared/_36kr";
import {baidu} from "../shared/baidu.ts";

const router = express.Router();

// @ts-ignore
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    const platform = req.query.platform as string | undefined;
    if (!platform) {
        return res.json([]);
    }

    baidu()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            next(error);
        });
});

export = router;
