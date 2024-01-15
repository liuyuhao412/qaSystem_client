import request from "@/api/request";
import base from "@/api/base";
/* 
*获取登录日志表格数据
*params：{page,limit}
*/
export function GetLogApi(params: object) {
    return request({
        url: base.get_log,
        method: "post",
        params,
    })
}