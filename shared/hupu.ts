import axios from "axios";
import * as cheerio from "cheerio"
import {proxyPicture} from "../utils";
import {HUPU_API} from "../constant";

export const hupu = async () => {
    const html: any = (await axios.get(HUPU_API, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0.0 Safari/537.36"
        }
    })).data;
    const $ = cheerio.load(html)
    const result: {
        id: string,
        title: string, url: string, extra: {
            [key: string]: string
        }
    }[] = [];
    let nextData = $("script").first();
    JSON.parse(nextData.text().split("window.$$data=")[1])
        .pageData
        .threads
        .forEach((item: any) => {
            const id = item.tid;
            const title = item.title;
            const url = `https://bbs.hupu.com${item.url}`;

            result.push({
                id,
                title,
                url,
                extra: {
                    desc: item.desc || "",
                    lights: item.lights || "",
                    replies: item.replies || "",
                    topic: item?.topic?.name || "",
                    cover: item?.cover ? proxyPicture(item.cover) : "",
                }
            });
        });
    return result;
}
