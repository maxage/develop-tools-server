import axios from "axios";
import {JUEJIN_API} from "../constant";
export const juejin = async () => {
    const res: shared.JueJinRes = (await axios.get(JUEJIN_API, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }
    })).data;
    return res.data.map((item: any) => {
        return {
            id: item.content.content_id,
            title: item.content.title,
            url: `https://juejin.cn/post/${item.content.content_id}`,
            extra: {
                view: item.content_counter.view,
                collect: item.content_counter.collect,
                like: item.content_counter.like,
            }
        }
    });
}
juejin()
