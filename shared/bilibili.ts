// Power by https://github.com/ourongxing/

import axios from "axios";
import {
    BLBL_HOT_SEARCH_API,
    BLBL_HOT_VIDEO_API,
    BLBL_RANK_API,
    BLBL_SEARCH_PREFIX,
    BLBL_VIDEO_PREFIX
} from "../constant";
import {genRandomUserAgent, proxyPicture, getCache, setCache} from "../utils";

const getResponseByUrl = async <T>(callBack: (res: T) => tools.NewsItem[], url?: string, cacheKey?: string) => {
    if (!url) {
        throw new Error("URL is not set")
    }

    // 尝试从缓存获取数据
    if (cacheKey) {
        const cachedData = getCache<tools.NewsItem[]>(cacheKey);
        if (cachedData) {
            return cachedData;
        }
    }

    const response = await axios.get(url, {
        headers: {
            "User-Agent": genRandomUserAgent()
        }
    });

    const result = callBack(response.data);

    // 设置缓存
    if (cacheKey) {
        setCache(cacheKey, result);
    }

    return result;
}

export const bHotSearch = async () => {
    return await getResponseByUrl<shared.BWapRes>(
        (res) => {
            return res.list.map(k => ({
                id: k.keyword,
                title: k.show_name,
                url: `${BLBL_SEARCH_PREFIX}${encodeURIComponent(k.keyword)}`,
                extra: {
                    icon: k.icon && proxyPicture(k.icon),
                },
            } as tools.NewsItem))
        },
        BLBL_HOT_SEARCH_API,
        'bilibili_hot_search'
    );
}

export const bHotVideo = async () => {
    return await getResponseByUrl<shared.BHotVideoRes>(
        (res) => {
            return res.data.list.map(video => ({
                id: video.bvid,
                title: video.title,
                url: `${BLBL_VIDEO_PREFIX}${video.bvid}`,
                pubDate: video.pubdate * 1000,
                extra: {
                    info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看 · ${formatNumber(video.stat.like)}点赞`,
                    hover: video.desc,
                    icon: proxyPicture(video.pic),
                },
            } as tools.NewsItem))
        },
        BLBL_HOT_VIDEO_API,
        'bilibili_hot_video'
    );
}

export const bRanking = async () => {
    return await getResponseByUrl<shared.BHotVideoRes>(
        (res) => {
            return res.data.list.map(video => ({
                id: video.bvid,
                title: video.title,
                url: `${BLBL_VIDEO_PREFIX}${video.bvid}`,
                pubDate: video.pubdate * 1000,
                extra: {
                    info: `${video.owner.name} · ${formatNumber(video.stat.view)}观看 · ${formatNumber(video.stat.like)}点赞`,
                    hover: video.desc,
                    icon: proxyPicture(video.pic),
                },
            } as tools.NewsItem))
        },
        BLBL_RANK_API,
        'bilibili_ranking'
    );
}

function formatNumber(num: number): string {
    if (num >= 10000) {
        return `${Math.floor(num / 10000)}w+`
    }
    return num.toString()
}

