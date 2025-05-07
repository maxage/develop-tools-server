import express from 'express';
import {promises as fs} from 'fs';
import path from 'path';

interface ShortLink {
    id: string;
    shortId: string;
    originalUrl: string;
    createdAt: string;
    expiryDate: string | null;
    accessCode: string | null;
    hasPassword: boolean;
    visitCount: number;
    clientId: string;
    shortUrl: string;
}

const router = express.Router();

// 创建短链接接口
router.post('/create', async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const {originalUrl, expiryType, accessCode, customSuffix, clientId, frontendHost} = req.body;

        if (!originalUrl) {
            return res.status(400).json({success: false, message: '原始URL不能为空'});
        }

        if (!clientId) {
            return res.status(400).json({success: false, message: '客户端ID不能为空'});
        }

        // 验证URL格式
        try {
            new URL(originalUrl);
        } catch (e) {
            return res.status(400).json({success: false, message: 'URL格式不正确'});
        }

        // 根据用户clientId创建目录
        const userDir = path.join(__dirname, '../data/short-links', clientId);
        const linksFile = path.join(userDir, 'links.json');

        // 确保用户目录存在
        await fs.mkdir(userDir, {recursive: true});

        // 读取或创建用户链接文件
        let links: ShortLink[] = [];
        try {
            const fileData = await fs.readFile(linksFile, 'utf-8');
            links = JSON.parse(fileData);
        } catch (error) {
            // 文件不存在，创建空数组
            links = [];
        }

        // 生成短链接ID
        let shortId: string;

        // 检查用户是否想要使用自定义后缀
        if (customSuffix) {
            // 先检查该后缀是否已被使用 - 需要检查所有用户的链接
            const allUsersDirs = await fs.readdir(path.join(__dirname, '../data/short-links'));
            let suffixExists = false;

            for (const dir of allUsersDirs) {
                const dirLinksFile = path.join(__dirname, '../data/short-links', dir, 'links.json');
                try {
                    const fileExists = await fs.access(dirLinksFile)
                        .then(() => true)
                        .catch(() => false);

                    if (fileExists) {
                        const dirLinks: ShortLink[] = JSON.parse(await fs.readFile(dirLinksFile, 'utf-8'));
                        if (dirLinks.some(link => link.shortId === customSuffix)) {
                            suffixExists = true;
                            break;
                        }
                    }
                } catch (error) {
                    // 忽略读取错误
                }
            }

            if (suffixExists) {
                return res.status(400).json({success: false, message: '自定义后缀已被使用'});
            }

            shortId = customSuffix;
        } else {
            // 生成一个随机的短ID
            shortId = generateUniqueShortId();

            // 确保全局唯一
            const allUsersDirs = await fs.readdir(path.join(__dirname, '../data/short-links'));
            let idExists = true;

            while (idExists) {
                idExists = false;

                for (const dir of allUsersDirs) {
                    const dirLinksFile = path.join(__dirname, '../data/short-links', dir, 'links.json');
                    try {
                        const fileExists = await fs.access(dirLinksFile)
                            .then(() => true)
                            .catch(() => false);

                        if (fileExists) {
                            const dirLinks: ShortLink[] = JSON.parse(await fs.readFile(dirLinksFile, 'utf-8'));
                            if (dirLinks.some(link => link.shortId === shortId)) {
                                idExists = true;
                                break;
                            }
                        }
                    } catch (error) {
                        // 忽略读取错误
                    }
                }

                if (idExists) {
                    shortId = generateUniqueShortId();
                }
            }
        }

        // 计算过期时间
        let expiryDate = null;
        if (expiryType) {
            const now = new Date();

            switch (expiryType) {
                case 'day':
                    expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case 'week':
                    expiryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                    break;
            }
        }

        // 使用前端提供的域名或默认域名
        const host = frontendHost || `${req.protocol}://${req.get('host')}`;
        const shortUrl = `${host}/api/s/${shortId}`;

        // 创建新短链接记录
        const newShortUrl: ShortLink = {
            id: shortId,
            shortId,
            originalUrl,
            createdAt: new Date().toISOString(),
            expiryDate: expiryDate ? expiryDate.toISOString() : null,
            accessCode,
            hasPassword: !!accessCode,
            visitCount: 0,
            clientId,
            shortUrl
        };

        // 添加到用户链接列表
        links.push(newShortUrl);

        // 保存更新后的链接列表
        await fs.writeFile(linksFile, JSON.stringify(links, null, 2));

        // 返回成功结果
        return res.json({
            success: true,
            shortUrl,
            id: shortId
        });
    } catch (error) {
        console.error('创建短链接时出错:', error);
        return res.status(500).json({success: false, message: '服务器错误'});
    }
});

// 获取用户的短链接列表
router.get('/list', async (req: express.Request, res: express.Response) => {
    try {
        const {clientId} = req.query;

        if (!clientId) {
            return res.status(400).json({success: false, message: '客户端ID不能为空'});
        }

        const userDir = path.join(__dirname, '../data/short-links', clientId.toString());
        const linksFile = path.join(userDir, 'links.json');

        // 检查用户目录是否存在
        try {
            await fs.access(userDir);
        } catch (error) {
            // 如果目录不存在，返回空列表
            return res.json({success: true, urls: []});
        }

        // 检查链接文件是否存在
        try {
            await fs.access(linksFile);
        } catch (error) {
            // 如果文件不存在，返回空列表
            return res.json({success: true, urls: []});
        }

        // 读取用户的短链接列表
        const data = await fs.readFile(linksFile, 'utf-8');
        const links = JSON.parse(data);

        return res.json({success: true, urls: links});
    } catch (error) {
        console.error('获取短链接列表时出错:', error);
        return res.status(500).json({success: false, message: '服务器错误'});
    }
});

// 删除短链接
router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {clientId} = req.query;

        if (!id) {
            return res.status(400).json({success: false, message: '短链接ID不能为空'});
        }

        if (!clientId) {
            return res.status(400).json({success: false, message: '客户端ID不能为空'});
        }

        const userDir = path.join(__dirname, '../data/short-links', clientId.toString());
        const linksFile = path.join(userDir, 'links.json');

        // 检查用户目录是否存在
        try {
            await fs.access(userDir);
        } catch (error) {
            return res.status(404).json({success: false, message: '用户不存在'});
        }

        // 检查链接文件是否存在
        try {
            await fs.access(linksFile);
        } catch (error) {
            return res.status(404).json({success: false, message: '没有找到短链接数据'});
        }

        // 读取用户的短链接列表
        const data = await fs.readFile(linksFile, 'utf-8');
        let links: ShortLink[] = JSON.parse(data);

        // 查找要删除的短链接
        const linkIndex = links.findIndex(link => link.shortId === id);

        if (linkIndex === -1) {
            return res.status(404).json({success: false, message: '短链接不存在'});
        }

        // 删除短链接
        links.splice(linkIndex, 1);

        // 保存更新后的列表
        await fs.writeFile(linksFile, JSON.stringify(links, null, 2));

        return res.json({success: true, message: '短链接删除成功'});
    } catch (error) {
        console.error('删除短链接时出错:', error);
        return res.status(500).json({success: false, message: '服务器错误'});
    }
});

// 生成唯一的短ID
function generateUniqueShortId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // 生成6位随机字符
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export default router;
