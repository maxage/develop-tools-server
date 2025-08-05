import {apiManager} from '../manager';
import {_36kr} from './_36kr';
import {baidu, baiduTeleplay} from './baidu';
import {bHotSearch, bHotVideo, bRanking} from "./bilibili";
import {referenceMessage} from "./cankaoxiaoxi";
import {douyin} from "./douyin";
import {gelonghui} from "./gelonghui";
import {guoheboke} from "./guoheboke";
import {githubTrending} from "./github";
import {ithome} from "./ithome";
import {jin10} from "./jin10";
import {kaopu} from "./kaopu";
import {kuaishou} from "./kuaishou";
import {linuxDoHot, linuxDoLatest} from "./linuxdo";
import {nowcoder} from "./nowcoder";
import {pcbetaWin, pcbetaWin11} from "./pcbeta";
import {smzdm} from "./smzdm";
import {solidot} from "./solidot";
import {sputniknewscn} from "./sputniknewscn";
import {thepaper} from "./thepaper";
import {tieba} from "./tieba";
import {toutiao} from "./toutiao";
import {v2exShare} from "./v2ex";
import {wallStreetCnHot, wallStreetCnLive, wallStreetCnNews} from "./wallstreetcn";
import {weibo} from "./weibo";
import {hotstock} from "./xueqiu";
import {zaobao} from "./zaobao";
import {zhihu} from "./zhihu";
import {telegraph} from "./cls";
import {coolapk} from "./coolapk.ts";
import {hupu, hupuLOL} from "./hupu.ts";
import {juejin} from "./juejin.ts";
import {douban} from "./douban.ts";
import {kugou, qqMusic} from "./music.ts";
import {csdn} from "./csdn.ts";
import {sspai} from "./sspai.ts";
import {jqka} from "./jqka.ts";
import {_51cto} from "./_51cto.ts";
import {dongchediHot, dongchediNews} from "./dongchedi.ts";

// 自动注册所有 API
export function initApis() {
    // 36氪
    apiManager.registerApi('_36kr', _36kr);
    // 百度
    apiManager.registerApi('baidu', baidu);
    // 哔哩哔哩-热搜
    apiManager.registerApi("b_hot_search", bHotSearch);
    // 哔哩哔哩-视频
    apiManager.registerApi('b_hot_video', bHotVideo);
    // 哔哩哔哩-排行榜
    apiManager.registerApi('b_rank', bRanking);
    // 参考消息
    apiManager.registerApi("cankaoxiaoxi", referenceMessage)
    // 抖音
    apiManager.registerApi("douyin", douyin)
    // 格隆汇
    apiManager.registerApi("gelonghui", gelonghui)
    // 果核剥壳
    apiManager.registerApi("guoheboke", guoheboke)
    // GitHub
    apiManager.registerApi("github", githubTrending)
    // IT之家
    apiManager.registerApi("ithome", ithome)
    // 金十
    apiManager.registerApi("jin10", jin10)
    // 靠谱
    apiManager.registerApi("kaopu", kaopu)
    // 快手
    apiManager.registerApi("kuaishou", kuaishou)
    // LinuxDo-热搜  TODO
    apiManager.registerApi("linuxdo_hot", linuxDoHot)
    // LinuxDo-最新  TODO
    apiManager.registerApi("linuxdo_latest", linuxDoLatest)
    // 牛客
    apiManager.registerApi("nowcoder", nowcoder)
    // 远景论坛-Windows
    apiManager.registerApi("pcbeta_windows", pcbetaWin)
    // 远景论坛-Windows11 TODO
    apiManager.registerApi("pcbeta_win11", pcbetaWin11)
    // 什么值得买 TODO
    apiManager.registerApi("smzdm", smzdm)
    // 奇客
    apiManager.registerApi("solidot", solidot)
    // 俄罗斯卫星通讯社
    apiManager.registerApi("sputniknewscn", sputniknewscn)
    // 澎湃新闻
    apiManager.registerApi("thepaper", thepaper)
    // 贴吧
    apiManager.registerApi("tieba", tieba)
    // 今日头条
    apiManager.registerApi("toutiao", toutiao)
    // V2EX-分享
    apiManager.registerApi("v2ex", v2exShare)
    // 华尔街新闻-直播
    apiManager.registerApi("wallstreetcn_live", wallStreetCnLive)
    // 华尔街新闻-新闻
    apiManager.registerApi("wallstreetcn_news", wallStreetCnNews)
    // 华尔街新闻-热榜
    apiManager.registerApi("wallstreetcn_hot", wallStreetCnHot)
    // 微博
    apiManager.registerApi("weibo", weibo)
    // 雪球
    apiManager.registerApi("hotstock", hotstock)
    // 联合早报
    apiManager.registerApi("zaobao", zaobao)
    // 知乎
    apiManager.registerApi("zhihu", zhihu)
    // 财联社
    apiManager.registerApi("cls_telegraph", telegraph)
    // 基安
    apiManager.registerApi("coolapk", coolapk);
    // 虎扑步行街
    apiManager.registerApi("hupu", hupu);
    // 虎扑LOL
    apiManager.registerApi("hupu_lol", hupuLOL);
    // 掘金
    apiManager.registerApi("juejin", juejin);
    // 豆瓣
    apiManager.registerApi("douban", douban);
    // 百度电视剧
    apiManager.registerApi("bd_tv", baiduTeleplay);
    // 酷狗音乐
    apiManager.registerApi("kugou", kugou);
    // qq音乐
    apiManager.registerApi("qq_music", qqMusic);
    // csdn
    apiManager.registerApi("csdn", csdn);
    // sspai
    apiManager.registerApi("sspai", sspai);
    // 同花顺
    apiManager.registerApi("jqka", jqka);
    // 51cto
    apiManager.registerApi("_51cto", _51cto);
    // 懂车帝热搜
    apiManager.registerApi("dcd_hot", dongchediHot);
    // 懂车帝资讯
    apiManager.registerApi("dcd_news", dongchediNews);
    // 在这里添加其他 API 的注册
}
