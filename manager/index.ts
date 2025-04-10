export class ApiManager {

    private readonly ApiMap: Record<string, Function>;

    constructor() {
        this.ApiMap = {};
    }

    getApi(apiName: string) {
        if (this.ApiMap[apiName]) {
            return this.ApiMap[apiName];
        } else {
            throw new Error(`API ${apiName} not found`);
        }
    }

    registerApi(apiName: string, apiFunction: Function) {
        this.ApiMap[apiName] = apiFunction;
    }
}

export const apiManager = new ApiManager();
