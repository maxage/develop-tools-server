import {Request, Response, NextFunction} from 'express';
import path from 'path';
import express from 'express';
import {promises as fsPromises} from 'fs';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    // 重定向到前端应用的主页
    const frontendUrl = process.env.FRONTEND_URL || 'https://tools.yltf.xyz';
    res.redirect(frontendUrl);
});

// 处理短链接访问
router.get('/s/:shortId', async (req: Request, res: Response) => {
    const { shortId } = req.params;

    // 查找短链接
    const shortLinksDir = path.join(__dirname, '../data/short-links');
    const userDirs = await fsPromises.readdir(shortLinksDir);

    let shortLink = null;
    let linkClientId = null;

    for (const clientId of userDirs) {
        const linksFile = path.join(shortLinksDir, clientId, 'links.json');

        try {
            const fileExists = await fsPromises.access(linksFile)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                const data = await fsPromises.readFile(linksFile, 'utf-8');
                const links = JSON.parse(data);

                const link = links.find((l: any) => l.shortId === shortId);
                if (link) {
                    shortLink = link;
                    linkClientId = clientId;
                    break;
                }
            }
        } catch (error) {
            console.error(`读取用户 ${clientId} 的短链接数据失败:`, error);
        }
    }

    if (!shortLink) {
        return res.render('notfound');
    }

    // 检查是否过期
    if (shortLink.expiryDate && new Date(shortLink.expiryDate) < new Date()) {
        return res.render('expired');
    }

    // 如果有密码保护，渲染密码页面
    if (shortLink.accessCode) {
        return res.render('password', {
            title: '密码保护的短链接',
            shortId: shortId,
            message: '此链接受密码保护，请输入密码访问',
            errorMessage: ''
        });
    }

    // 更新访问计数
    shortLink.visitCount = (shortLink.visitCount || 0) + 1;

    // 保存更新后的数据
    if (linkClientId) {
        const linksFile = path.join(shortLinksDir, linkClientId, 'links.json');
        const data = await fsPromises.readFile(linksFile, 'utf-8');
        const links = JSON.parse(data);

        const linkIndex = links.findIndex((l: any) => l.shortId === shortId);
        if (linkIndex !== -1) {
            links[linkIndex] = shortLink;
            await fsPromises.writeFile(linksFile, JSON.stringify(links, null, 2));
        }
    }

    // 重定向到原始URL
    res.redirect(shortLink.originalUrl);
});

// 处理密码验证
router.post('/s/verify/:shortId', async (req: Request, res: Response): Promise<any> => {
    try {
        const {shortId} = req.params;
        const {accessCode} = req.body;

        if (!accessCode) {
            return res.render('password', {
                title: '密码保护的短链接',
                shortId: shortId,
                message: '此链接受密码保护，请输入密码访问',
                errorMessage: '请输入密码'
            });
        }

        // 查找短链接
        const shortLinksDir = path.join(__dirname, '../data/short-links');
        const userDirs = await fsPromises.readdir(shortLinksDir);

        let shortLink = null;
        let linkClientId = null;

        for (const clientId of userDirs) {
            const linksFile = path.join(shortLinksDir, clientId, 'links.json');

            try {
                const fileExists = await fsPromises.access(linksFile)
                    .then(() => true)
                    .catch(() => false);

                if (fileExists) {
                    const data = await fsPromises.readFile(linksFile, 'utf-8');
                    const links = JSON.parse(data);

                    const link = links.find((l: any) => l.shortId === shortId);
                    if (link) {
                        shortLink = link;
                        linkClientId = clientId;
                        break;
                    }
                }
            } catch (error) {
                console.error(`读取用户 ${clientId} 的短链接数据失败:`, error);
            }
        }

        if (!shortLink) {
            return res.render('notfound');
        }

        // 检查是否过期
        if (shortLink.expiryDate && new Date(shortLink.expiryDate) < new Date()) {
            return res.render('expired');
        }

        // 验证密码
        if (shortLink.accessCode !== accessCode) {
            return res.render('password', {
                title: '密码保护的短链接',
                shortId: shortId,
                message: '此链接受密码保护，请输入密码访问',
                errorMessage: '密码错误，请重试'
            });
        }

        // 密码正确，更新访问计数
        shortLink.visitCount = (shortLink.visitCount || 0) + 1;

        // 保存更新后的数据
        if (linkClientId) {
            const linksFile = path.join(shortLinksDir, linkClientId, 'links.json');
            const data = await fsPromises.readFile(linksFile, 'utf-8');
            const links = JSON.parse(data);

            const linkIndex = links.findIndex((l: any) => l.shortId === shortId);
            if (linkIndex !== -1) {
                links[linkIndex] = shortLink;
                await fsPromises.writeFile(linksFile, JSON.stringify(links, null, 2));
            }
        }

        // 重定向到原始URL
        res.redirect(shortLink.originalUrl);
    } catch (error) {
        console.error('处理密码验证时出错:', error);
        res.status(500).render('error', {
            message: '服务器错误',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
});

export default router;
