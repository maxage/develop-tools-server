import express, { Request, Response } from 'express';
import axios from 'axios';
import sharp from 'sharp';
import { createHash } from 'crypto';
import { genRandomUserAgent } from '../utils';

const router = express.Router();

// 缓存配置
const CACHE_TIME = 24 * 60 * 60 * 1000; // 24小时
const imageCache = new Map<string, { data: Buffer; timestamp: number }>();

// 清理过期缓存
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of imageCache) {
        if (now - value.timestamp > CACHE_TIME) {
            imageCache.delete(key);
        }
    }
}, CACHE_TIME);

// 生成缓存key
const generateCacheKey = (url: string, options: any): string => {
    const str = `${url}-${JSON.stringify(options)}`;
    return createHash('md5').update(str).digest('hex');
};

// 验证时间戳和签名
const verifyRequest = (req: Request): boolean => {
    if (!process.env.PROXY_SECRET) return true;

    const timestamp = parseInt(req.query.t as string);
    if (isNaN(timestamp) || Date.now() - timestamp > 300000) { // 5分钟过期
        return false;
    }

    // TODO: 添加签名验证逻辑
    return true;
};

router.get('/image', async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            url,
            w: width,
            h: height,
            q: quality,
            fmt: format,
            cache = 'true'
        } = req.query;

        if (!url) {
            res.status(400).send('URL is required');
            return;
        }

        // 验证请求
        if (!verifyRequest(req)) {
            res.status(403).send('Invalid request');
            return;
        }

        // 解析参数
        const options = {
            width: width ? parseInt(width as string) : undefined,
            height: height ? parseInt(height as string) : undefined,
            quality: quality ? parseInt(quality as string) : 80,
            format: format as 'jpeg' | 'png' | 'webp' | undefined
        };

        // 检查缓存
        const cacheKey = generateCacheKey(url as string, options);
        if (cache === 'true' && imageCache.has(cacheKey)) {
            const cached = imageCache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
                res.set('Content-Type', `image/${options.format || 'jpeg'}`);
                res.set('X-Cache', 'HIT');
                res.send(cached.data);
                return;
            }
        }

        // 解码URL
        const decodedUrl = decodeURIComponent(url as string);
        // 获取图片
        const response = await axios.get(decodedUrl, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': genRandomUserAgent()
            }
        });

        // 处理图片
        let image = sharp(response.data);

        // 调整大小
        if (options.width || options.height) {
            image = image.resize(options.width, options.height, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // 转换格式和质量
        if (options.format) {
            switch (options.format) {
                case 'jpeg':
                    image = image.jpeg({ quality: options.quality });
                    break;
                case 'png':
                    image = image.png({ quality: options.quality });
                    break;
                case 'webp':
                    image = image.webp({ quality: options.quality });
                    break;
            }
        }

        // 输出处理后的图片
        const processedImage = await image.toBuffer();

        // 缓存处理后的图片
        if (cache === 'true') {
            imageCache.set(cacheKey, {
                data: processedImage,
                timestamp: Date.now()
            });
        }

        // 设置响应头
        res.set('Content-Type', `image/${options.format || 'jpeg'}`);
        res.set('X-Cache', 'MISS');
        res.set('Cache-Control', 'public, max-age=86400'); // 24小时客户端缓存

        // 发送图片
        res.send(processedImage);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Error processing image');
    }
});

export default router;
