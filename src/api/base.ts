const base = {
    login: "/login",//登录
    register: "/register",//注册
    send_code: "/register/send_code",//发送验证码
    get_log:"/admin_log/get_log",//获取日志列表
    get_code:"/admin_code/get_code",//获取验证码列表
    get_user:"/admin_user/get_user",//获取用户列表
    add_user:"/admin_user/add_user",//添加用户
    update_user:"/admin_user/update_user",//编辑用户
    delete_user:"/admin_user/delete_user",//编辑用户
    set_password:"/admin_user/set_password",//重置密码
    update_password:"/admin_user/update_password",//重置密码
};

export default base;
