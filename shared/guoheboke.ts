import * as cheerio from "cheerio"
import axios from "axios";
import {GUOHEBOKE_API} from "../constant";

const relativeTimeToDate = function (timeStr: string) {
    const units = {
        秒: 1000,
        分钟: 60 * 1000,
        小时: 60 * 60 * 1000,
        天: 24 * 60 * 60 * 1000,
        周: 7 * 24 * 60 * 60 * 1000,
        月: 30 * 24 * 60 * 60 * 1000,
        年: 365 * 24 * 60 * 60 * 1000,
    }

    const match = timeStr.match(/^(\d+)\s*([秒天周月年]|分钟|小时)/)
    if (!match) {
        return ""
    }

    const num = Number.parseInt(match[1])
    const unit = match[2] as keyof typeof units
    const msAgo = num * units[unit]

    return new Date(Date.now() - msAgo).valueOf()
}

export const guoheboke = async () => {
    if (!GUOHEBOKE_API) {
        throw new Error("Guoheboke API is not set")
    }
    const html: any = (await axios.get(GUOHEBOKE_API)).data
    const $ = cheerio.load(html)
    const news: tools.NewsItem[] = []
    $(".sec-panel .sec-panel-body .post-loop li").each((i, elem) => {
        let summary_title = $(elem).find(".item-content .item-title").text()
        if (summary_title) {
            summary_title = summary_title.trim()
            summary_title = summary_title.replaceAll("'", "''")
        }
        let summary_description = $(elem).find(".item-content .item-excerpt").text()
        if (summary_description) {
            summary_description = summary_description.trim()
            summary_description = summary_description.replaceAll("'", "''")
        }
        const date = $(elem).find(".item-content .date").text()
        const url = $(elem).find(".item-content .item-title a").attr("href")!!
        news.push({
            id: url,
            url,
            title: summary_title,
            extra: {
                hover: summary_description,
                date: relativeTimeToDate(date),
            },
        })
    })

    return news
}
