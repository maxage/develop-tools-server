// Power by https://github.com/ourongxing/
import {proxyPicture} from "../utils";
import axios from "axios";
import {WEIBO_API} from "../constant";


export const weibo = async () => {
    if (!WEIBO_API) throw new Error("Weibo API is missing");
    const res: shared.WeiBoRes = (await axios.get(WEIBO_API)).data
    return res.data.realtime
        .filter(k => !k.is_ad)
        .map((k) => {
            const keyword = k.word_scheme ? k.word_scheme : `#${k.word}#`
            return {
                id: k.word,
                title: k.word,
                extra: {
                    icon: k.icon && {
                        url: proxyPicture(k.icon),
                        scale: 1.5,
                    },
                },
                url: `https://s.weibo.com/weibo?q=${encodeURIComponent(keyword)}`,
                mobileUrl: `https://m.weibo.cn/search?containerid=231522type%3D1%26q%3D${encodeURIComponent(keyword)}&_T_WM=16922097837&v_p=42`,
            } as tools.NewsItem
        })
}
