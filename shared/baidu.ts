import axios from "axios";
import {BAIDU_API,BAIDU_TELEPLAY_API} from "../constant";

export const baidu = async () => {
    if (!BAIDU_API) {
        throw new Error("Baidu API is not set")
    }
    const rawData = await axios.get(BAIDU_API)
    const jsonStr = (rawData.data as string).match(/<!--s-data:(.*?)-->/)
    const data: shared.BaiduRes = JSON.parse(jsonStr![1])
    return data.cards[0].content.filter(k => !k.isTop).map((k) => {
        return {
            id: k.rawUrl,
            title: k.word,
            url: k.rawUrl,
            extra: {
                hover: k.desc,
                rank: k.index,
                num: k.hotScore,
            },
        } as tools.NewsItem
    })
}


export const baiduTeleplay = async () => {
    if (!BAIDU_TELEPLAY_API) {
        throw new Error("Baidu Teleplay API is not set")
    }
    const rawData = await axios.get(BAIDU_TELEPLAY_API);
    const jsonStr = (rawData.data as string).match(/<!--s-data:(.*?)-->/);
    if (!jsonStr) {
        throw new Error("Failed to parse Baidu Teleplay data");
    }
    const data: shared.BaiduTeleplayRes = JSON.parse(jsonStr[1]);
    return data.cards[0].content.map((k) => {
        return {
            id: k.word,
            title: k.word,
            url: k.url,
            extra: {
                desc: k.desc,
                score: k.hotScore,
                rank: k.index,
                info: k.show.join("·"),
                icon: {
                    url: k.img
                }
            },
        } as tools.NewsItem;
    })
}
