import {proxyPicture} from "../utils";
import axios from "axios";
import {ZHIHU_API} from "../constant";

export const zhihu = async () => {
    if (!ZHIHU_API) throw new Error("ZHIHU_API is missing");
    const res: shared.ZhiHuRes = (await axios.get(ZHIHU_API)).data;
    return res.data
        .map((k) => {
            const urlId = k.target.url?.match(/(\d+)$/)?.[1]
            return {
                id: k.target.id,
                title: k.target.title,
                extra: {
                    icon: k.card_label?.night_icon && proxyPicture(k.card_label.night_icon),
                },
                url: `https://www.zhihu.com/question/${urlId || k.target.id}`,
            }
        })
}
