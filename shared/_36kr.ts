// Power by https://github.com/ourongxing/
import {load} from "cheerio"
import axios from "axios";
import {parseRelativeDate} from "../utils";
import {_36KR_API, _36KR_BASE_API} from "../constant";

export const _36kr = async () => {
    if (!_36KR_API) {
        throw new Error("36kr API is not set")
    }
    const response = await axios.get(_36KR_API)
    const $ = load(response?.data)
    const news: tools.NewsItem[] = []
    const $items = $(".newsflash-item")
    $items.each((_, el) => {
        const $el = $(el)
        const $a = $el.find("a.item-title")
        const url = $a.attr("href")
        const title = $a.text()
        const relativeDate = $el.find(".time").text()
        if (url && title && relativeDate) {
            news.push({
                url: `${_36KR_BASE_API}${url}`,
                title,
                id: url,
                extra: {
                    date: parseRelativeDate(relativeDate, "Asia/Shanghai").valueOf(),
                },
            })
        }
    })
    return news
}
