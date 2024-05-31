import request from "./index";

const uploadVideoApi = (data: FormData) => {
    return request({
        url: "/v1/upload/uploadDescription",
        method: "post",
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const getVideoApi = () => {
    return request({
        url: "/v1/video/getVideo",
        method: "post",
    });
};

export default {
    uploadVideoApi,
    getVideoApi,
};
