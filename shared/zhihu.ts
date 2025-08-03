// Power by https://github.com/ourongxing/
import {proxyPicture} from "../utils";
import axios from "axios";
import {ZHIHU_API} from "../constant";

export const zhihu = async () => {
    if (!ZHIHU_API) throw new Error("ZHIHU_API is missing");
    const res: shared.ZhiHuRes = (await axios.get(ZHIHU_API)).data;
    return res.data
        .map((k) => {
            return {
                id: k.id,
                title: k.target.title_area.text,
                extra: {
                    icon: {
                        url: k.card_label?.night_icon && proxyPicture(k.card_label.night_icon),
                    }
                },
                url: k.target.link.url,
            }
        }) as tools.NewsItem[];
}
