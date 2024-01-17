import request from "@/api/request";
import base from "@/api/base";
/* 
*获取登录日志表格数据
*params：{page,limit,emaill}
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
*params：{page,limit,email,role}
*/
export function GetUserApi(params: object) {
    return request({
        url: base.get_user,
        method: "post",
        params,
    })
}
/* 
*添加用户信息
*params：{email,role}
*/
export function AddUserApi(params: object) {
    return request({
        url: base.add_user,
        method: "post",
        params,
    })
}
/* 
*编辑用户信息
*params：{email,role}
*/
export function UpdateUserApi(params: object) {
    return request({
        url: base.update_user,
        method: "post",
        params,
    })
}
/* 
*删除用户信息
*params：{email}
*/
export function DeleteUserApi(params: object) {
    return request({
        url: base.delete_user,
        method: "post",
        params,
    })
}
/* 
*重置密码
*params：{email}
*/
export function SetPasswordApi(params: object) {
    return request({
        url: base.set_password,
        method: "post",
        params,
    })
}

/* 
*重置密码
*params：{email}
*/
export function UpdatePasswordApi(params: object) {
    return request({
        url: base.update_password,
        method: "post",
        params,
    })
}
