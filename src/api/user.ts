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