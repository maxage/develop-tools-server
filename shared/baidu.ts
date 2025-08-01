// Power by https://github.com/ourongxing/

import axios from "axios";
import {BAIDU_API} from "../constant";

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
