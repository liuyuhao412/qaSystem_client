import request from "@/api/request";
import base from "@/api/base";
/* 
*获取登录日志表格数据
*params：{page,limit,username}
*/
export function GetLogApi(params: object) {
    return request({
        url: base.get_log,
        method: "post",
        params,
    })
}
/* 
*获取登录日志表格数据
*params：{page,limit,email,role}
*/
export function GetCodeApi(params: object) {
    return request({
        url: base.get_code,
        method: "post",
        params,
    })
}
/* 
*获取用户表格数据
*params：{page,limit.username,role}
*/
export function GetUserApi(params: object) {
    return request({
        url: base.get_user,
        method: "post",
        params,
    })
}