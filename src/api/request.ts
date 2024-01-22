import axios from "axios";
//request是一个axios实例,每一个实例你都可以单独定制它的baseURL,超时时间和一些其他配置项。

const request = axios.create({
    baseURL: "/api",
    timeout: 60000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    }
});

//请求拦截器,就是说请求在到达服务器之前,你对发送到服务器的数据进行一些处理,比如后端说除了登录之外的接口都要在请求头上面带上token,你就可以在这里处理
request.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("token")) {
            config.headers.token = localStorage.getItem("token") || "";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//响应拦截器,后端数据真正被你的变量接收之前,进行一些预处理,比如对于一些5,4开头的状态码进行统一处理
request.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = "错误请求";
                    break;
                case 401:
                    error.message = "未授权，请重新登录";
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = "请求错误,未找到该资源";
                    break;
                case 405:
                    error.message = "请求方法未允许";
                    break;
                case 408:
                    error.message = "请求超时";
                    break;
                case 500:
                    error.message = "服务器端出错";
                    break;
                case 501:
                    error.message = "网络未实现";
                    break;
                case 502:
                    error.message = "网络错误";
                    break;
                case 503:
                    error.message = "服务不可用";
                    break;
                case 504:
                    error.message = "网络超时";
                    break;
                case 505:
                    error.message = "http版本不支持该请求";
                    break;
                default:
                    error.message = `未知错误${error.response.status}`;
            }
        } else {
            error.message = "连接到服务器失败";
        }
        return Promise.reject(error);
    }
);

export default request;
