// 为了保持全局可用，同时添加全局声明
declare global {
    namespace tools {
        type NewsItem = import('tools').NewsItem;
    }
    namespace shared {
        type Res = import('shared').Res;
    }
}

export {};
