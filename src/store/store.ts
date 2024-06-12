import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
    state: () => ({
        showComment: false, // 控制显示评论功能
        videoBase64File: "", // 存储视频信息【丢弃】
        videoCoverFile: null as File | null, //存储封面信息20240611
        uploadedFile: null as File | null, // 存储视频信息
        showMeSetting: false, // 控制me页面登录弹出框
        isLoged: false,
        myVideoIdList: JSON.parse(localStorage.getItem("myVideoIdList")) || [], //防止刷新数据丢失，持久化
        showMyVideoLike: false, //显示我的总获赞数量
        myInfo: {} as any, // 我的个人信息-2024-06-12
    }),
    actions: {
        changeCommentShow() {
            this.showComment = !this.showComment;
            // console.log("this.showComment", this.showComment);
        },
        setVideoBase64File(base64: any) {
            // console.log("base64", base64);
            this.videoBase64File = base64;
        },
        // 存储处理文件形式的视频
        setUploadedFile(file: File) {
            this.uploadedFile = file;
        },
        // 处理图片-240611
        setImageFile(file: File) {
            this.videoCoverFile = file;
        },
        // 取消选择图片
        cancelImageFile() {
            this.videoCoverFile = null;
        },
        isShowMeSeting() {
            this.showMeSetting = !this.showMeSetting;
        },
        setLogStatus(value: boolean) {
            this.isLoged = value;
        },
        setMyVideoIdList(videoIdList: any) {
            this.myVideoIdList = videoIdList;
            localStorage.setItem("myVideoIdList", JSON.stringify(videoIdList));
        },
        setShowMyVideoLike() {
            this.showMyVideoLike = !this.showMyVideoLike;
        },
        setMyInfo(info: object) {
            this.myInfo = info;
        },
    },
});
