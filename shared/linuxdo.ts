// Power by https://github.com/ourongxing/
import axios from "axios";
import {LINUXDO_API, LINUXDO_DAILY_API, LINUXDO_LATEST_API} from "../constant";

export const linuxDoHot = async () => {
    if (!LINUXDO_DAILY_API) {
        throw new Error("LINUXDO_DAILY_API is not defined")
    }
    const res: shared.LinuxDoRes = (await axios.get(LINUXDO_DAILY_API)).data
    return res.topic_list.topics
        .filter(k => k.visible && !k.archived && !k.pinned)
        .map(k => ({
            id: k.id,
            title: k.title,
            url: `https://linux.do/t/topic/${k.id}`,
        } as tools.NewsItem))
}

export const linuxDoLatest = async () => {
    if (!LINUXDO_LATEST_API) {
        throw new Error("LINUXDO_LATEST_API is not defined")
    }
    const res: shared.LinuxDoRes = (await axios.get(LINUXDO_LATEST_API)).data
    return res.topic_list.topics
        .filter(k => k.visible && !k.archived && !k.pinned)
        .map(k => ({
            id: k.id,
            title: k.title,
            pubDate: new Date(k.created_at).valueOf(),
            url: `${LINUXDO_API}/${k.id}`,
        } as tools.NewsItem))
}
