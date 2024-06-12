import request from "./index";
/**
 * public页面-上传视频
 * @param data
 * @returns
 */
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

/**
 * 首页-获取视频
 * @returns
 */
const getVideoApi = videoId => {
    return request({
        url: "/v1/video/getVideo",
        method: "post",
        data: {
            videoId,
        },
    });
};

/**
 * 首页获取评论
 * @param videoId
 * @returns
 */
const getCommentApi = (videoId: number) => {
    return request({
        url: "/v1/comment/getComment",
        method: "post",
        data: {
            video_id: videoId,
        },
    });
};

/**
 * 关注创建
 * @param video_id
 * @returns
 */
const createFollowApi = (user_id: number) => {
    return request({
        url: "/v1/follow/createFllower",
        method: "post",
        data: {
            follow_id: user_id,
        },
    });
};

// 喜欢和不喜欢的接口（收藏）应该写新的接口传布尔值-20240602
const createVideoLikeApi = (video_id: number) => {
    return request({
        url: "/v1/like/videoLike",
        method: "post",
        data: {
            video_id,
        },
    });
};
const createVideoDislikeApi = (video_id: number) => {
    return request({
        url: "/v1/like/videoDislike",
        method: "post",
        data: {
            video_id,
        },
    });
};

const createCollectionApi = (videoId: number) => {
    return request({
        url: "/v1/collection/createCollection",
        method: "post",
        data: {
            video_id: videoId,
        },
    });
};

const createCancelCollectionApi = (videoId: number) => {
    return request({
        url: "/v1/collection/deleteCollection",
        method: "post",
        data: {
            video_id: videoId,
        },
    });
};

const getMyVideoApi = () => {
    return request({
        url: "/v1/user/getMyVideo",
        method: "post",
    });
};

export default {
    uploadVideoApi,
    getVideoApi,
    getCommentApi,
    createVideoLikeApi,
    createVideoDislikeApi,
    createFollowApi,
    createCollectionApi,
    createCancelCollectionApi,
    getMyVideoApi,
};
