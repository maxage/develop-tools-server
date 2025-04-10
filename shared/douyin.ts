// Power by https://github.com/ourongxing/
import axios from "axios";
import {DOUYIN_API, DOYIN_LOGIN_API} from "../constant";

export const douyin = async () => {
    if (!DOUYIN_API || !DOYIN_LOGIN_API) {
        throw new Error("Douyin API is not set")
    }
    // 首先获取 cookie
    const loginResponse = await axios.get(DOYIN_LOGIN_API);
    const cookies = loginResponse.headers['set-cookie'] || [];

    // 使用获取到的 cookie 发送请求
    const res: shared.DouyinRes = (await axios.get(DOUYIN_API, {
        headers: {
            'Cookie': cookies.join('; '),
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
        }
    })).data;

    return res.data.word_list.map((k) => {
        return {
            id: k.sentence_id,
            title: k.word,
            url: `https://www.douyin.com/hot/${k.sentence_id}`,
        } as tools.NewsItem
    });
}
