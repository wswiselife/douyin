import request from "./index";

const loginApi = (params?: any, data?: any) => {
    return request({
        url: "/v0/auth/login",
        method: "post",
        params,
        data,
    });
};

const getUserInfoApi = (params?: any, data?: any) => {
    return request({
        url: "/v1/user/getUserInfo",
        method: "get",
        params,
        data,
    });
};

const updateUserInfoApi = (params?: any, data?: any) => {
    return request({
        url: "/v1/user/updateUserInfo",
        method: "post",
        params,
        data,
    });
};

export default {
    getUserInfoApi,
    updateUserInfoApi,
    loginApi,
};
