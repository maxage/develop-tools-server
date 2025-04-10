
import {zhihu} from "../shared/zhihu.ts";

function runLog(fun: Function) {
    fun().then((d: any) => console.log(d))
}

runLog(zhihu)
