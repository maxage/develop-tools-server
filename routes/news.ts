import express from "express";
import type {Request, Response, NextFunction} from "express";
import {apiManager} from "../manager";

const router = express.Router();
/**
 * 获取新闻列表
 */
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
    const platform = req.query.platform as string | undefined;
    if (!platform) {
        res.json([]);
        return;
    }

    apiManager.getApi(platform)()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error);
        });
});

export = router;
