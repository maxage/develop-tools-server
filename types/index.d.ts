// 为了保持全局可用，同时添加全局声明
declare global {
    namespace tools {
        type NewsItem = import('tools').NewsItem;
        type MatchItem = import('tools').MatchItem;
        type RSSInfo = import('tools').RSSInfo;
        type RSSItem = import('tools').RSSItem;
    }
    namespace shared {
        type BaiduRes = import('shared').BaiduRes;
        type BWapRes = import('shared').BWapRes;
        type BHotVideoRes = import('shared').BHotVideoRes;
        type ReferenceMessageRes = import('shared').ReferenceMessageRes;
        type DouyinRes = import('shared').DouyinRes;
        type Jin10Item = import('shared').Jin10Item;
        type KaoPuRes = import('shared').KaoPuRes;
        type KuaishouRes = import('shared').KuaishouRes;
        type KuaishouHotRankData = import('shared').KuaishouHotRankData;
        type LinuxDoRes = import('shared').LinuxDoRes;
        type NowCoderRes = import('shared').NowCoderRes;
        type ThepaperRes = import('shared').ThepaperRes;
        type TieBaRes = import('shared').TieBaRes;
        type TouTiaoRes = import('shared').TouTiaoRes;
        type V2exRes = import('shared').V2exRes;
        type WallStreetCnItem = import('shared').WallStreetCnItem;
        type WallStreetCnLiveRes = import('shared').WallStreetCnLiveRes;
        type WallStreetCnNewsRes = import('shared').WallStreetCnNewsRes;
        type WallStreetCnHotRes = import('shared').WallStreetCnHotRes;
        type WeiBoRes = import('shared').WeiBoRes;
        type StockRes = import('shared').StockRes;
        type ZhiHuRes = import('shared').ZhiHuRes;
        type ClsTelegramRes = import('shared').ClsTelegramRes;
        type CoolapkRes = import('shared').CoolapkRes;
        type JueJinRes = import('shared').JueJinRes;
        type DouBanRes = import('shared').DouBanRes;
        type BaiduTeleplayRes = import('shared').BaiduTeleplayRes;
        type HuPuLOLRes = import('shared').HuPuLOLRes;
        type HuPuLoLScoreRes = import('shared').HuPuLoLScoreRes;
        type QQMusicRes = import('shared').QQMusicRes;
        type CSDNRes = import('shared').CSDNRes;
        type SSPAIRes = import('shared').SSPAIRes;
        type JQKARes = import('shared').JQKARes;
        type DongCheDiRes = import('shared').DongCheDiRes;
    }
}

export {};
