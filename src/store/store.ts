import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
    state: () => ({
        showComment: false,
        videoBase64File: "",
        uploadedFile: null as File | null,
    }),
    actions: {
        change() {
            this.showComment = !this.showComment;
            console.log("this.showComment", this.showComment);
        },
        setVideoBase64File(base64: any) {
            // console.log("base64", base64);
            this.videoBase64File = base64;
        },
        // 存储处理文件形式的视频
        setUploadedFile(file: File) {
            this.uploadedFile = file;
        },
    },
});
