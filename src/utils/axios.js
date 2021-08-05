import axios from "axios";

// 本文件创建自定义axios，并赋值给window.axios
// 提供给climb框架的网络请求能够符合自己项目要求，能够进行token赋值以及请求结果过滤等

let instance = axios.create({
    timeout: 1000 * 60,
    baseURL: "http://127.0.0.1:8849"
});

// HTTP拦截
instance.interceptors.request.use(
    config => {
        console.log("拦截到request", config)
        // 维护自己的token
        config.headers["Authorization"] = "Bearer 6931c587-9836-4139-b075-97a9b5c2fc5f"
        config.headers["TENANT-ID"] = "1356882347906609154"
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// HTTP拦截
instance.interceptors.response.use(
    res => {
        console.log("拦截到response", res)
        return res;
    },
    error => {
        console.log("拦截到response error", error)
        return Promise.reject(error);
    }
);

export default instance;
