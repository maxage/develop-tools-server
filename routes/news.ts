import express from "express";
import type {Request, Response, NextFunction} from "express";
import {apiManager} from "../manager";
import { ApiResponse } from "../utils/response";

const router = express.Router();
/**
 * 获取新闻列表
 */
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
    const platform = req.query.platform as string | undefined;
    if (!platform) {
        res.json(ApiResponse.success([], "未指定平台"));
        return;
    }

    apiManager.getApi(platform)()
        .then(data => {
            res.json(ApiResponse.success(data));
        })
        .catch(error => {
            res.json(ApiResponse.error(error.message || "获取数据失败", 500));
        });
});

export = router;
