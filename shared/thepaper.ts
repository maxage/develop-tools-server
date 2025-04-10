// Power by https://github.com/ourongxing/
import axios from "axios";
import {THEPAPER_API, THEPAPER_DETAIL_API, THEPAPER_MOBILE_DETAIL_API} from "../constant";

export const thepaper = async () => {
    if (!THEPAPER_API) throw new Error("THEPAPER_API is not defined");
    const res: shared.ThepaperRes = (await axios.get(THEPAPER_API)).data
    return res.data.hotNews
        .map((k) => {
            return {
                id: k.contId,
                title: k.name,
                url: `${THEPAPER_DETAIL_API}${k.contId}`,
                mobileUrl: `${THEPAPER_MOBILE_DETAIL_API}${k.contId}`,
            } as tools.NewsItem
        })
}
