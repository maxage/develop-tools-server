import axios from "axios";
import {NOWCODER_API, NOWCODER_DEATIL_API, NOWCODER_DISCUSS_API} from "../constant";


export const nowcoder = async () => {
    const timestamp = Date.now()
    const url = `${NOWCODER_API}?size=20&_=${timestamp}&t=`
    const res: shared.NowCoderRes = (await axios.get(url)).data
    return res.data.result
        .map((k) => {
            let url, id
            if (k.type === 74) {
                url = `${NOWCODER_DEATIL_API}/${k.uuid}`
                id = k.uuid
            } else if (k.type === 0) {
                url = `${NOWCODER_DISCUSS_API}/${k.id}`
                id = k.id
            }
            return {
                id,
                title: k.title,
                url,
            } as tools.NewsItem
        })
}
