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

    apiManager.getApi(platform)(
        {...req.query}
    )
        .then(data => {
            res.json(ApiResponse.success(data));
        })
        .catch(error => {
            res.json(ApiResponse.error(error.message || "获取数据失败", 500));
        });
});

/**
 * 获取AI总结列表
 */
router.get('/ai', (req: Request, res: Response, next: NextFunction): void => {
    let category = req.query.category as string | undefined;
    if (!category) {
        category = 'hot';
    }

    apiManager.getApi('ai-summary')(
        {...req.query, category}
    )
        .then(data => {
            res.json(ApiResponse.success(data));
        })
        .catch(error => {
            res.json(ApiResponse.error(error.message || "获取数据失败", 500));
        });
});


export = router;
