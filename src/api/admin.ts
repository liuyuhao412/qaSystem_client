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
*修改密码
*params：{email}
*/
export function UpdatePasswordApi(params: object) {
    return request({
        url: base.update_password,
        method: "post",
        params,
    })
}

/* 
*获取知识库列表数据
*params：{page,limit}
*/
export function GetKbListApi(params: object) {
    return request({
        url: base.get_kb_list,
        method: "post",
        params,
    })
}

/* 
*创建知识库
*params：{kb_name}
*/
export function AddKbApi(params: object) {
    return request({
        url: base.add_kb,
        method: "post",
        params,
    })
}

/* 
*删除知识库
*params：{kb_name}
*/
export function DeleteKbApi(params: object) {
    return request({
        url: base.delete_kb,
        method: "post",
        params,
    })
}
/* 
*选择知识库
*params：{kb_name}
*/
export function SelectKbApi(params: object) {
    return request({
        url: base.select_kb_list,
        method: "post",
        params,
    })
}
/* 
*获取知识库列表数据
*params：{page,limit}
*/
export function GetFileListApi(params: object) {
    return request({
        url: base.get_file_list,
        method: "post",
        params,
    })
}
/* 
*获取知识库列表数据
*params：{name,filename}
*/
export function DeleteDocApi(params: object) {
    return request({
        url: base.delete_doc,
        method: "post",
        params,
    })
}
/* 
*获取知识库列表数据
*params：{kb_name,file,chunk_size_max_length,chunk_overlap_length,zh_title_enhance}
*/
export function UploadApi(params: object) {
    return request({
        url: base.upload_form,
        method: "post",
        params,
    })
}
/* 
*获取知识库列表数据
*params：{key，value}
*/
export function GetConfigApi(params: object) {
    return request({
        url: base.get_config,
        method: "post",
        params,
    })
}

/* 
*获取知识库列表数据
*params：{key，value}
*/
export function SaveConfigApi(params: object) {
    return request({
        url: base.save_config,
        method: "post",
        params,
    })
}

