import axios, {
    type AxiosError,
    type AxiosResponse,
    type AxiosInstance,
} from "axios";
import config from "../config/config";

// 处理 类型“AxiosResponse<any, any>”上不存在属性“code”。
declare module "axios" {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: 60000,
});

axiosInstance.interceptors.request.use(
    config => {
        // 处理
        // const token = localStorage.getItem('token')
        const token = localStorage.getItem("token");
        config.headers["Authorization"] = "Bearer " + token;
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
