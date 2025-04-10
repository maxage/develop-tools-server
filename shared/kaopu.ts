// Power by https://github.com/ourongxing/
import axios, {AxiosResponse} from "axios";
import {KAOPU_API} from "../constant";

export const kaopu = async () => {
    const res = await Promise.all([`${KAOPU_API}news_list_beta_hans_0.json`,
        `${KAOPU_API}news_list_beta_hans_1.json`].map(url => axios.get(url) as Promise<AxiosResponse<Array<shared.KaoPuRes>>>))
    return res.map(item => item.data).flat().filter(k => ["财新", "公视"].every(h => k.publisher !== h)).map((k) => {
        return {
            id: k.link,
            title: k.title,
            pubDate: k.pubDate,
            extra: {
                hover: k.description,
                info: k.publisher,
            },
            url: k.link,
        }
    })
}
