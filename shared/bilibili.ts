// Power by https://github.com/ourongxing/

import axios from "axios";
import {
    BLBL_HOT_SEARCH_API,
    BLBL_HOT_VIDEO_API,
    BLBL_RANK_API,
    BLBL_SEARCH_PREFIX,
    BLBL_VIDEO_PREFIX
} from "../constant";
import {proxyPicture} from "../utils";

const getResponseByUrl = async <T>(callBack: (res: T) => tools.NewsItem[], url?: string) => {
    if (!url) {
        throw new Error("URL is not set")
    }
    return callBack((await axios.get(url)).data)
}


export const bHotSearch = async () => {
    return await getResponseByUrl<shared.BWapRes>((res) => {
        return res.list.map(k => ({
            id: k.keyword,
            title: k.show_name,
            url: `${BLBL_SEARCH_PREFIX}${encodeURIComponent(k.keyword)}`,
            extra: {
                icon: k.icon && proxyPicture(k.icon),
            },
        } as tools.NewsItem))
    }, BLBL_HOT_SEARCH_API);
}
export const bHotVideo = async () => {
    return await getResponseByUrl<shared.BHotVideoRes>((res) => {
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
    }, BLBL_HOT_VIDEO_API);
}

export const bRanking = async () => {
    return await getResponseByUrl<shared.BHotVideoRes>((res) => {
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
    }, BLBL_RANK_API);
}

function formatNumber(num: number): string {
    if (num >= 10000) {
        return `${Math.floor(num / 10000)}w+`
    }
    return num.toString()
}

