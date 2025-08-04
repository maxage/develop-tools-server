import axios from "axios";
import {CSDN_API} from "../constant";

export const csdn = async () => {
    if (!CSDN_API) {
        throw new Error("CSDN API is not set");
    }
    const response: shared.CSDNRes = (await axios.get(CSDN_API)).data;
    return response.data["www-info-list-new"].info.list.map(item => {
        return {
            id: item.id,
            title: item.title,
            url: item.url,
            extra: {
                icon: {
                    url: item.avatar && item.avatar.replace(/http:/, "https:"),
                    scale: 0.8,
                },
                desc: item.summary,
                view: item.viewCount,
                collect: item.commentCount,
                like: item.diggCount,
            }
        } as tools.NewsItem
    })
}
