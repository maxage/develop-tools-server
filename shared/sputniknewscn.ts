import * as cheerio from "cheerio"
import {SPUTNIKNEWSCN_API} from "../constant";
import axios from "axios";

export const sputniknewscn = async () => {
    if (!SPUTNIKNEWSCN_API) throw new Error("Missing SPUTNIKNEWSCN_API");
    const response: any = (await axios.get(SPUTNIKNEWSCN_API)).data
    const $ = cheerio.load(response)
    const $items = $(".lenta__item")
    const news: tools.NewsItem[] = []
    $items.each((_, el) => {
        const $el = $(el)
        const $a = $el.find("a")
        const url = $a.attr("href")
        const title = $a.find(".lenta__item-text").text()
        const date = $a.find(".lenta__item-date").attr("data-unixtime")
        if (url && title && date) {
            news.push({
                url: `https://sputniknews.cn${url}`,
                title,
                id: url,
                extra: {
                    date: new Date(Number(`${date}000`)).getTime(),
                },
            })
        }
    })
    return news
}
