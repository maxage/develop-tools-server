import axios from "axios";
import * as cheerio from "cheerio"
import {proxyPicture} from "../utils";
import {HUPU_API, HUPU_LOL_API, HUPU_LOL_SCORE_API} from "../constant";

export const hupu = async () => {
    if (!HUPU_API) {
        throw new Error("HUPU_API is not set");
    }
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


export const hupuLOL = async () => {
    if (!HUPU_LOL_API) {
        throw new Error("HUPU_LOL_API is not set");
    }
    const res: shared.HuPuLOLRes = (await axios.get(HUPU_LOL_API)).data
    let match = res.result.components.filter(item => item.code === "match")[0];
    if (!match) {
        throw new Error("No match data found");
    }

    const results: tools.MatchItem[] = [];

    // 串行处理，避免API频率限制
    for (const item of match.data.matchInfo) {
        let matchId = item.matchId;
        let needAddTotalScore = item.matchStatus === "COMPLETED";

        let newVar = {
            matchName: item.matchName || "",
            matchStatus: item.matchStatusDesc || "",
            matchStartTimeStamp: item.matchStartTimeStamp || 0,
            memberInfos: item.againstInfo.memberInfos.map((matchInfo) => {
                return {
                    memberName: matchInfo.memberName,
                    memberId: matchInfo.memberId,
                    memberBaseScore: matchInfo.memberBaseScore,
                    memberLogo: matchInfo.memberLogo ? proxyPicture(matchInfo.memberLogo) : "",
                }
            }),
        } as tools.MatchItem;

        if (needAddTotalScore) {
            try {
                const teamMap = new Map<string, string>();
                item.againstInfo.memberInfos.forEach((matchInfo) => {
                    teamMap.set(matchInfo.memberId, matchInfo.memberName);
                });
                newVar.totalScore = await hupuLoLScore(matchId, teamMap);
            } catch (error) {
                console.error(`Failed to fetch score for matchId: ${matchId}`, error);
            }
        }

        results.push(newVar);
    }

    return results;
}


export const hupuLoLScore = async (
    matchId: string,
    teamMap: Map<string, string> = new Map<string, string>()
) => {
    if (!HUPU_LOL_SCORE_API) {
        throw new Error("HUPU_LOL_SCORE_API is not set");
    }
    const res: shared.HuPuLoLScoreRes = (await axios.get(HUPU_LOL_SCORE_API + matchId)).data;
    return res.data.teamScoreInfo.map(item => {
        return {
            teamName: teamMap.get(item.teamId + ""),
            teamId: item.teamId,
            playerInfo: item.playerInfo,
        }
    })
}

