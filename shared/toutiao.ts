// Power by https://github.com/ourongxing/
import axios from "axios";
import {proxyPicture} from "../utils";
import {TOUTIAO_API, TOUTIAO_PREFIX} from "../constant";


export const toutiao = async () => {
    if (!TOUTIAO_API) throw new Error("TOUTIAO API is missing");
    const res: shared.TouTiaoRes = (await axios.get(TOUTIAO_API)).data
    return res.data
        .map((k) => {
            return {
                id: k.ClusterIdStr,
                title: k.Title,
                url: `${TOUTIAO_PREFIX}${k.ClusterIdStr}/`,
                extra: {
                    icon: {
                        url: k.LabelUri?.url && proxyPicture(k.LabelUri.url)
                    },
                },
            }
        }) as tools.NewsItem[];
}
