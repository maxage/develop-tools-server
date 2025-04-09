// Power by https://github.com/ourongxing/

import axios from "axios";

export const baidu = async () => {
    const rawData = await axios.get(`https://top.baidu.com/board?tab=realtime`)
    const jsonStr = (rawData.data as string).match(/<!--s-data:(.*?)-->/)
    const data: shared.Res = JSON.parse(jsonStr![1])
    return data.cards[0].content.filter(k => !k.isTop).map((k) => {
        return {
            id: k.rawUrl,
            title: k.word,
            url: k.rawUrl,
            extra: {
                hover: k.desc,
            },
        }
    })
}
