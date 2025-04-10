// Power by https://github.com/ourongxing/
import axios from "axios";
import {STOCK_API, STOCK_LOGIN_API} from "../constant";

export const hotstock = async () => {
    if (!STOCK_API || !STOCK_LOGIN_API) throw new Error("STOCK_API or STOCK_LOGIN_API is missing");
    const loginResponse = await axios.get(STOCK_LOGIN_API);
    const cookies = loginResponse.headers['set-cookie'] || [];
    const res: shared.StockRes = (await axios.get(STOCK_API, {
        headers: {
            cookie: cookies.join("; "),
        },
    })).data
    return res.data.items.filter(k => !k.ad).map(k => ({
        id: k.code,
        url: `https://xueqiu.com/s/${k.code}`,
        title: k.name,
        extra: {
            info: `${k.percent}% ${k.exchange}`,
        },
    }))
}
