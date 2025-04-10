import {apiManager} from '../manager';
import {_36kr} from './_36kr';
import {baidu} from './baidu';
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

// 自动注册所有 API
export function initApis() {
    apiManager.registerApi('_36kr', _36kr);
    apiManager.registerApi('baidu', baidu);
    apiManager.registerApi("b_hot_search", bHotSearch);
    apiManager.registerApi('b_hot_video', bHotVideo);
    apiManager.registerApi('b_rank', bRanking);
    apiManager.registerApi("cankaoxiaoxi", referenceMessage)
    apiManager.registerApi("douyin", douyin)
    apiManager.registerApi("gelonghui", gelonghui)
    apiManager.registerApi("guoheboke", guoheboke)
    apiManager.registerApi("github", githubTrending)
    apiManager.registerApi("ithome", ithome)
    apiManager.registerApi("jin10", jin10)
    apiManager.registerApi("kaopu", kaopu)
    apiManager.registerApi("kuaishou", kuaishou)
    apiManager.registerApi("linuxdo_hot", linuxDoHot)
    apiManager.registerApi("linuxdo_latest", linuxDoLatest)
    apiManager.registerApi("nowcoder", nowcoder)
    apiManager.registerApi("pcbeta_windows", pcbetaWin)
    apiManager.registerApi("pcbeta_win11", pcbetaWin11)
    apiManager.registerApi("smzdm", smzdm)
    apiManager.registerApi("solidot", solidot)
    apiManager.registerApi("sputniknewscn", sputniknewscn)
    apiManager.registerApi("thepaper", thepaper)
    apiManager.registerApi("tieba", tieba)
    apiManager.registerApi("toutiao", toutiao)
    apiManager.registerApi("v2ex", v2exShare)
    apiManager.registerApi("wallstreetcn_live", wallStreetCnLive)
    apiManager.registerApi("wallstreetcn_news", wallStreetCnNews)
    apiManager.registerApi("wallstreetcn_hot", wallStreetCnHot)
    apiManager.registerApi("weibo", weibo)
    apiManager.registerApi("hotstock", hotstock)
    apiManager.registerApi("zaobao", zaobao)
    apiManager.registerApi("zhihu", zhihu)

    // 在这里添加其他 API 的注册
    apiManager.registerApi("cls_telegraph", telegraph)
}
