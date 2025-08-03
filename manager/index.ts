export class ApiManager {

    private readonly ApiMap: Record<string, (...args: any[]) => Promise<Array<tools.NewsItem | tools.MatchItem>>>;

    constructor() {
        this.ApiMap = {};
    }

    getApi(apiName: string): (...args: any[]) => Promise<Array<tools.NewsItem | tools.MatchItem>> {
        if (this.ApiMap[apiName]) {
            return this.ApiMap[apiName];
        } else {
            throw new Error(`API ${apiName} not found`);
        }
    }

    registerApi(apiName: string, apiFunction: (...args: any[]) => Promise<Array<tools.NewsItem | tools.MatchItem>>) {
        this.ApiMap[apiName] = apiFunction;
    }
}

export const apiManager = new ApiManager();
