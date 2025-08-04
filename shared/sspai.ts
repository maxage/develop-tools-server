import axios from "axios";
import {SSPAI_API} from "../constant";

export const sspai = async () => {
    if (!SSPAI_API) {
        throw new Error("SSPAI API is not set");
    }
    const response: shared.SSPAIRes = (await axios.get(SSPAI_API)).data;
    return response.data.map(item => {
        return {
            id: item.id,
            title: item.title,
            url: `https://sspai.com/post/${item.id}`,
            extra: {
                icon: {
                    url: `https://cdnfile.sspai.com${item.banner}`,
                    scale: 0.8,
                },
                author: item.author.nickname,
                desc: item.summary,
                view: item.view_count,
                collect: item.comment_count,
                like: item.like_count,
            }
        } as tools.NewsItem;
    });
}
sspai();
