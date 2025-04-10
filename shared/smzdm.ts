// Power by https://github.com/ourongxing/
import * as cheerio from "cheerio"
import axios from "axios";
import {SMZDM_API} from "../constant";

export const smzdm = async () => {
    if (!SMZDM_API) throw new Error("Missing SMZDM_API");
    const html: any = (await axios.get(SMZDM_API)).data
    const $ = cheerio.load(html)
    const $main = $("#feed-main-list .z-feed-title")
    const news: tools.NewsItem[] = []
    $main.each((_, el) => {
        const a = $(el).find("a")
        const url = a.attr("href")!
        const title = a.text()
        news.push({
            url,
            title,
            id: url,
        })
    })
    return news
}
