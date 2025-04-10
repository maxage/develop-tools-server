import express from "express";
import type {Request, Response, NextFunction} from "express"
import {_36kr} from "../shared/_36kr";
import {baidu} from "../shared/baidu.ts";
import {apiManager} from "../manager";

const router = express.Router();

// @ts-ignore
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    const platform = req.query.platform as string | undefined;
    if (!platform) {
        return res.json([]);
    }

    res.json(apiManager.getApi(platform))
});

export = router;
