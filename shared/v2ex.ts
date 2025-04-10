// Power by https://github.com/ourongxing/
import axios, {AxiosResponse} from "axios";
import {V2EX_API} from "../constant";

export const v2exShare = async () => {
    const res = await Promise.all(["create", "ideas", "programmer", "share"]
        .map(k => axios.get(`${V2EX_API}/${k}.json`) as Promise<AxiosResponse<shared.V2exRes>>))
    return res.map(k => k.data.items).flat().map(k => ({
        id: k.id,
        title: k.title,
        extra: {
            date: k.date_modified ?? k.date_published,
        },
        url: k.url,
    } as tools.NewsItem)).sort((m, n) => m.extra?.date!! < n.extra?.date!! ? 1 : -1)
}
