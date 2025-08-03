import axios from "axios";
import {proxyPicture} from "../utils";
import {DOUBAN_API} from "../constant";

export const douban = async () => {
    if (!DOUBAN_API) {
        throw new Error("DouBan API is not set");
    }
    const res: shared.DouBanRes = await axios.get(DOUBAN_API, {
        headers: {
            "Referer": "https://m.douban.com/movie/"
        }
    });
    return res.data.subject_collection_items.map((item) => {
        return {
            id: item.id,
            title: item.title,
            url: item.url,
            extra: {
                rank: item.rank_value,
                icon: {
                    info: item.card_subtitle,
                    url: proxyPicture(item.pic.normal),
                },
                rating: {
                    count: item.rating.count,
                    value: item.rating.value,
                },
                comments: {
                    content: item.comments ? item.comments[0].comment : "",
                    avatar: item.comments ? item.comments[0].user.avatar : "",
                }
            }
        } as tools.NewsItem;
    });
}
