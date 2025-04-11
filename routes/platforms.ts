import express from "express";
import type { Request, Response } from "express";
import { ApiResponse } from "../utils/response";
import platforms from "../config/platforms.json";

const router = express.Router();

/**
 * 获取支持的平台列表
 */
router.get('/', (req: Request, res: Response): void => {
    res.json(ApiResponse.success(platforms));
});

export = router; 