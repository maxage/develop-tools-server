import axios from "axios";
import * as cheerio from "cheerio"
import {FISHP_API, FISHP_API_COOKIE} from "../constant";

export const fishpi = async () => {
    if (!FISHP_API) throw new Error("FISHP_API is not defined");

    const res: any = (await axios.get(FISHP_API, {
        headers: {
            "Cookie": FISHP_API_COOKIE || "",
        }
    })).data;
    let $ = cheerio.load(res);
    const result: tools.NewsItem[] = [];
    $(".article-list > ul > li").each((index, item) => {
        const $item = $(item);
        const title = $item.find(".ft-a-title").text();
        const id = $item.find(".ft-a-title").attr("href")?.split("/").pop() || "";
        let elements = $item.find(".abstract");
        const description = elements.text();
        // a 标签带有class  ft-fade
        const like = $item.find("a.ft-fade > b").text()
        const view = $item.find("a.ft-fade > span").text();
        result.push({
            id,
            title,
            url: `https://fishpi.cn/article/${id}`,
            extra: {
                desc: description,
                like,
                view,
            }
        })
    })
    return result;
}
