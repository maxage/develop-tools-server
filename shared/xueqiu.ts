import axios from "axios";
import {STOCK_API, STOCK_LOGIN_API, STOCK_SCREENER_API} from "../constant";

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
export const stockSha = async (params: {
    order?: string
}) => {
    return await baseFunction("sha", params.order)
}
export const stockShb = async (params: {
    order?: string
}) => {
    return await baseFunction("shb", params.order)
}
export const stockSza = async (params: {
    order?: string
}) => {
    return await baseFunction("sza", params.order)
}
export const stockSzb = async (params: {
    order?: string
}) => {
    return await baseFunction("szb", params.order)
}
export const stockCyb = async (params: {
    order?: string
}) => {
    return await baseFunction("cyb", params.order)
}
export const stockZxb = async (params: {
    order?: string
}) => {
    return await baseFunction("zxb", params.order)
}
export const stockHk = async (params: {
    order?: string
}) => {
    return await baseFunction("hk", params.order, "HK")
}
export const stockUs = async (params: {
    order?: string
}) => {
    return await baseFunction("us", params.order, "US")
}

const baseFunction = async (type: string, order: string = "desc", market: string = "ZH") => {
    if (!STOCK_SCREENER_API || !STOCK_LOGIN_API) throw new Error("STOCK_SCREENER_API or STOCK_LOGIN_API is missing");
    const loginResponse = await axios.get(STOCK_LOGIN_API);
    const cookies = loginResponse.headers['set-cookie'] || [];
    let res: shared.DPYTRes = (await axios.get(`${STOCK_SCREENER_API}&type=${type}&market=${market}&order=${order}`, {
        headers: {
            'Cookie': cookies.join("; "),
        }
    })).data;
    return res.data.list.map((item) => {
        return {
            id: item.symbol,
            title: `${item.name} (${item.symbol})`,
            url: `https://xueqiu.com/S/${item.symbol}`,
            extra: {
                current: item.current,
                change: item.chg,
                percent: (item.percent).toFixed(2),
                market_capital: item.market_capital,
            }
        }
    })
}

