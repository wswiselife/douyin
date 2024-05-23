import axios, {
    type AxiosError,
    type AxiosResponse,
    type AxiosRequestConfig,
    type AxiosInstance,
} from "axios";
import config from "../config/config";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        // 处理
        // const token = localStorage.getItem('token')
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJhY2NvdW50IjoiamlhbnpoaTEiLCJpYXQiOjE3MTYyNzY2NzEsImV4cCI6MTcxNjM2MzA3MX0.3utPJe6IagtPu10TKLxftJyxXWXB-aDinrPD2PVxQSI";
        config.headers["Authorization"] = "Bearer " + token;
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
