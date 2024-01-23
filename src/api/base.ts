const base = {
    login: "/login",//登录
    register: "/register",//注册
    send_code: "/register/send_code",//发送验证码
    get_log:"/admin_log/get_log",//获取日志列表
    get_code:"/admin_code/get_code",//获取验证码列表
    get_user_count:"/admin_home/get_user_count",//获取用户数量
    get_register_list:"/admin_home/get_register_list",//获取用户数量
    get_user_log:"/admin_home/get_user_log",//获取用户登录次数
    get_login_list:"/admin_home/get_login_list",//获取用户各个月登录次数
    get_user:"/admin_user/get_user",//获取用户列表
    add_user:"/admin_user/add_user",//添加用户
    update_user:"/admin_user/update_user",//编辑用户
    delete_user:"/admin_user/delete_user",//编辑用户
    set_password:"/admin_user/set_password",//重置密码
    update_password:"/admin_user/update_password",//重置密码
    get_kb_list:"/admin_model/get_kb_list",//获取知识库列表
    add_kb:"/admin_model/add_kb",//创建知识库
    delete_kb:"/admin_model/delete_kb",//删除知识库
    select_kb_list:"/admin_model/select_kb_list",//选择知识库
    get_file_list:"/admin_model/get_file_list",//获取文件列表
    delete_doc:"/admin_model/delete_doc",//删除文件
    upload:"/admin_model/upload",//上传文件
    upload_form:"/admin_model/upload_form",//上传
    get_config:"/admin_model/get_config",//保存配置
    save_config:"/admin_model/save_config",//保存配置
    get_history:"/admin_history/get_history",//获取历史记录列表
    chat:"/chat",//聊天
    get_user_history:"/get_history"//获取用户历史记录列表
};

export default base;
