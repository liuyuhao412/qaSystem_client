import request from "@/api/request";
import base from "@/api/base";
/* 
*登录
*params：{username,password}
*/
export function LoginApi(params: object) {
    return request({
        url: base.login,
        method: "post",
        params,
    })
}
/* 
*注册
*params：{username,code,password,confirmpassword}
*/
export function RegisterApi(params: object) {
    return request({
        url: base.register,
        method: "post",
        params,
    })
}