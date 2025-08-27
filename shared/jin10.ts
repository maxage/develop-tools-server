// Power by https://github.com/ourongxing/
import {parseRelativeDate} from "../utils";
import axios from "axios";
import {JIN10_API, JIN10_DETAIL_API} from "../constant";
import dayjs from "dayjs/esm";

export const jin10 = async () => {
    const timestamp = Date.now()
    const url = `${JIN10_API}${timestamp}`

    const rawData: string = (await axios.get(url)).data

    const jsonStr = (rawData as string)
        .replace(/^var\s+newest\s*=\s*/, "") // 移除开头的变量声明
        .replace(/;*$/, "") // 移除末尾可能存在的分号
        .trim() // 移除首尾空白字符
    const data: shared.Jin10Item[] = JSON.parse(jsonStr)

    return data.filter(k => (k.data.title || k.data.content) && !k.channel?.includes(5)).map((k) => {
        const text = (k.data.title || k.data.content)!.replace(/<\/?b>/g, "")
        const [title, desc] = text.match(/^【([^】]*)】(.*)$/) ?? []
        return {
            id: k.id,
            title: title ?? text,
            url: `${JIN10_DETAIL_API}${k.id}`,
            extra: {
                hover: desc,
                info: !!k.important && "✰",
                date: dayjs.tz(k.time, "Asia/Shanghai").valueOf(),
            },
        } as tools.NewsItem
    })
}
