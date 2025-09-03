import axios from "axios";
import {NewsItem} from "tools";
import platforms from "../config/platforms.json";
import {apiManager} from "../manager";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import dayjs from "dayjs/esm";

dotenv.config();
export const aiSummary = async (params: {
    category: string
}) => {
    let dateStr = dayjs()
        .tz("Asia/Shanghai")
        .add(-1, "hour").format("YYYY-MM-DD-HH");
    let filePath = path.join(__dirname, `../data/summary/${params.category}`, `${dateStr}.txt`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        // 使用正则匹配 ```json ... ``` 之间的内容
        let match = content.match(/```json([\s\S]*?)```/);
        if (match) {
            content = match[1].trim();
        }
        try {
            let parse = JSON.parse(content);
            parse.generatedAt = dayjs().add(-1, "hour").format("YYYY-MM-DD HH:00:00");
            parse.category = params.category;
            return parse;
        } catch (e) {
            return {
                category: params.category,
                generatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                summary: "解析AI摘要失败",
                hotTopics: [],
                trends: [],
                sections: []
            }
        }
    } else {
        throw new Error(`File ${filePath} not found`);
    }
};


const aiSummaryRequest = async (items: NewsItem[], category: string) => {
    if (!process.env.AI_URL || !process.env.AI_SK || !process.env.AI_MODEL) {
        throw new Error("AI 配置未设置");
    }
    // 预处理新闻数据，去除不必要的字段
    items.forEach(news => {
        news.url = ''
        news.mobileUrl = ''
        const desc = news?.extra?.desc
        if (news.extra) {
            delete news.extra
        }
        if (desc) {
            news.extra = {desc}
        }
    })
    axios.post(process.env.AI_URL!!, {
        model: process.env.AI_MODEL,
        messages: [
            {
                role: "system",
                content: `
你是一个新闻摘要助手，能够从提供的新闻标题和链接中提取关键信息并生成简洁的总结。请根据以下要求进行总结：
## 要求：
1. 提取每条新闻的主要内容，忽略冗余信息。
2. 生成的总结应简洁明了，突出新闻的核心观点。
3. 使用正式且专业的语言，避免使用口语化表达。
4. 每条新闻的总结应独立成段，必须存在于用户提供的消息中。
## 输出格式
1. 要为标准JSON格式，不允许携带其他任何内容
2. 格式要为 {
    summary: 内容摘要描述,
    hotTopics: [
      {
        topic: '突发重大事件',
        description: '今日发生的重要事件引起了社会各界的高度关注，各大媒体平台纷纷进行报道和分析。',
        relatedPlatforms: [  "来源平台1"....]
      },
      {
        topic: '行业发展趋势',
        description: '最新的行业报告显示了明显的发展趋势，专家对此进行了深度解读和预测。',
        relatedPlatforms: [ "来源平台1"....]
      },
      ...
    ],
    trends: [
      {
        title: '技术创新突破',
        description: '近期在相关领域出现了重要的技术突破，可能会对行业产生深远影响。'
      },
      {
        title: '市场格局变化',
        description: '市场竞争格局正在发生微妙变化，各方势力都在调整策略以应对新的挑战。'
      },
      {
        title: '用户需求升级',
        description: '用户需求呈现出新的特点和趋势，企业需要及时调整产品和服务策略。'
      },
      ...
    ],
    sections: [
      {
        title: '重点关注',
        content: '基于大数据分析，以下内容值得特别关注：这些话题不仅反映了当前的社会热点，也预示着未来的发展方向。',
        platforms: [ "来源平台1"]
      },
      {
        title: '深度分析',
        content: '通过对多平台数据的交叉分析，我们发现了一些有趣的趋势和模式，这些洞察有助于更好地理解当前的舆论环境。',
        platforms: [ "来源平台1"... ]
      },
      ...
    ]
  }
} 以上为示例数据格式，不可直接输出，需要分析用户的内容
3. 不可捏造不存在的新闻
4. hotTopics,trends,sections 每个数组至少包含10个元素, 且要全部来源于用户提供的消息
5. 来源平台为 新闻中的 source 字段
请根据以下新闻列表生成总结：
${JSON.stringify(items)}
请开始你的总结。
                `
            }
        ]
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.AI_SK}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        },
        timeout: 600000,
    }).then(res => {
        // 生成的文件名
        const fileName = dayjs().format("YYYY-MM-DD-HH") + ".txt";
        // 确保目录存在
        const dir = path.join(__dirname, `../data/summary/${category}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }
        // 写入文件
        fs.writeFileSync(path.join(dir, fileName), res.data.choices[0].message.content);
        return res.data
    }).catch(err => {
        console.error(`${category} 分类摘要生成失败:`, err);
    })
}


/**
 * 获取指定分类下所有平台的新闻数据
 */
const fetchCategoryNews = async (category: string, platformList: string[]): Promise<NewsItem[]> => {
    console.log(`开始获取分类 [${category}] 的新闻数据，平台列表:`, platformList);

    const fetchPromises = platformList.map(async (platform) => {
        try {
            const newsData = await apiManager.getApi(platform)({});
            console.log(`平台 [${platform}] 获取到 ${newsData.length} 条新闻`);
            return newsData.map(item => ({...item, source: platform})).slice(0, 50); // 每个平台最多取50条
        } catch (error) {
            return [];
        }
    });

    const results = await Promise.allSettled(fetchPromises);
    const allNews: NewsItem[] = [];

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            // @ts-ignore
            allNews.push(...result.value);
        } else {
            console.error(`平台 [${platformList[index]}] 数据获取失败:`, result.reason);
        }
    });

    console.log(`分类 [${category}] 总计获取到 ${allNews.length} 条新闻`);
    return allNews;
};

/**
 * 处理单个分类的摘要生成
 */
const processCategorySummary = async (category: { category: string, name: string, platform: string[] }) => {
    try {
        console.log(`开始处理分类 [${category.name}]...`);

        // 获取该分类下所有平台的新闻数据
        const newsData = await fetchCategoryNews(category.category, category.platform);

        if (newsData.length === 0) {
            console.warn(`分类 [${category.name}] 没有获取到任何新闻数据，跳过摘要生成`);
            return;
        }

        // 生成AI摘要
        console.log(`为分类 [${category.name}] 生成AI摘要...`);
        await aiSummaryRequest(newsData, category.category);

        console.log(`分类 [${category.name}] 摘要生成完成`);

    } catch (error) {
        console.error(`处理分类 [${category.name}] 摘要时出错:`, error);
    }
};

const CronJob = require('cron').CronJob;
const job = new CronJob('55 * * * *', async () => {
    try {
        console.log('开始执行AI摘要定时任务...');
        const startTime = Date.now();

        // 并发处理所有分类
        const processingPromises = platforms.map(category => processCategorySummary(category));

        // 等待所有分类处理完成
        const results = await Promise.allSettled(processingPromises);

        // 统计结果
        let successCount = 0;
        let failureCount = 0;

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                successCount++;
            } else {
                failureCount++;
                console.error(`分类 [${platforms[index].name}] 处理失败:`, result.reason);
            }
        });

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;

        console.log(`AI摘要定时任务完成！耗时: ${duration}秒`);
        console.log(`成功: ${successCount} 个分类，失败: ${failureCount} 个分类`);

    } catch (e) {
        console.error("AI 定时任务出错", e);
    }
}, {
    timezone: "Asia/Shanghai"
});

job.start();
