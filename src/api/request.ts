import axios, { AxiosError } from "axios";
import { ElLoading, ElMessage } from 'element-plus'
//request是一个axios实例,每一个实例你都可以单独定制它的baseURL,超时时间和一些其他配置项。
type LoadingInstance = ReturnType<typeof ElLoading.service>;
let requestLoadingInstance: LoadingInstance;

const request = axios.create({
    baseURL: "/api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    }
});

//请求拦截器,就是说请求在到达服务器之前,你对发送到服务器的数据进行一些处理,比如后端说除了登录之外的接口都要在请求头上面带上token,你就可以在这里处理
request.interceptors.request.use(
    (config) => {
        // requestLoadingInstance = ElLoading.service({ text: 'Loading...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
        if (localStorage.getItem("token")) {
            config.headers.token = localStorage.getItem("token") || "";
        }
        return config;
    },
    (error) => {
        // requestLoadingInstance.close();
        return Promise.reject(error);
    }
);

//响应拦截器,后端数据真正被你的变量接收之前,进行一些预处理,比如对于一些5,4开头的状态码进行统一处理
request.interceptors.response.use(
    (config) => {
        // requestLoadingInstance.close();
        return config;
    },
    (error) => {
        // requestLoadingInstance.close();
        handleErrorResponse(error);
        return Promise.reject(error);
    }
);


function handleErrorResponse(error: AxiosError) {
    let errorMessage = "连接到服务器失败";  // 默认错误消息
    if (error.response) {
        switch (error.response.status) {
            case 400:
                //请求的语法格式有错误。
                errorMessage = "错误请求";
                break;
            case 401:
                //请求要求身份验证。用户需要提供有效的身份验证信息，通常是登录凭据。
                errorMessage = "未授权，请重新登录";
                break;
            case 403:
                //缺乏对资源的访问权限。
                errorMessage = "拒绝访问";
                break;
            case 404:
                //服务器找不到请求的资源。通常是由于输入的 URL 或请求参数错误导致。
                errorMessage = "请求错误,未找到该资源";
                break;
            case 405:
                //请求中指定的方法被服务器禁止。
                errorMessage = "请求方法未允许";
                break;
            case 408:
                //客户端未在服务器预备等候的时间内发出请求。
                errorMessage = "请求超时";
                break;
            case 500:
                //服务器遇到了意料不到的情况，无法完成请求。这是服务器内部错误的通用响应。
                errorMessage = "服务器端出错";
                break;
            case 501:
                // 服务器不支持当前请求所需要的某个功能。
                errorMessage = "网络未实现";
                break;
            case 502:
                //服务器作为网关或代理，从上游服务器收到无效的响应。
                errorMessage = "网络错误";
                break;
            case 503:
                //服务器当前无法处理请求，通常是临时性的情况，例如服务器过载或维护。
                errorMessage = "服务不可用";
                break;
            case 504:
                //作为网关或代理的服务器未及时从上游服务器接收请求。
                errorMessage = "网络超时";
                break;
            case 505:
                // 服务器不支持请求中所使用的 HTTP 协议版本。
                errorMessage = "http版本不支持该请求";
                break;
            default:
                errorMessage = `未知错误${error.response.status}`;
        }
    } else {
        errorMessage = "连接到服务器失败";
    }
    ElMessage({
        message: errorMessage,
        type: "error",
        duration: 1000,
    });

}

export default request;
