import request from "@/api/request";
import base from "@/api/base";
/* 
*问答功能
*params：{question}
*/
export function ChatApi(params: object) {
    return request({
        url: base.chat,
        method: "post",
        params,
    })
}

/* 
*获取用户历史记录表格数据
*params：{page,limit,username,role}
*/
export function GetUserHistoryApi(params: object) {
    return request({
        url: base.get_user_history,
        method: "post",
        params,
    })
}