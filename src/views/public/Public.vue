<script setup lang="ts">
import CommonButton from "@/components/CommonButton.vue";
// import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import Upload from "@/components/Upload.vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { usePiniaStore } from "@/store/store";

const pinia = usePiniaStore();

const router = useRouter();

onMounted(() => {
    isAuthorized.value = checkAuthorization();
});

const isAuthorized = ref(false);

const checkAuthorization = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/login");
        return false;
    }
    return true;
};

// 不做处理
const publicVideo = () => {};

const publicPhoto = () => {
    console.log("photo");
};

const getVideoFile = (file: any) => {
    // 处理是否时视频-20240611
    // console.log("public-file", file);
    // 检查文件是否存在
    if (!file || !file.type) {
        ElMessage({
            type: "info",
            message: "文件无效，请重新选择！",
        });
        return;
    }

    // 定义视频文件类型
    const videoTypes = [
        "video/mp4",
        "video/avi",
        "video/mov",
        "video/wmv",
        "video/flv",
        "video/webm",
        "video/mkv",
    ];

    // 检查文件类型是否为视频类型
    if (videoTypes.includes(file.type)) {
        // 存储视频文件（这里你可以实现具体的存储逻辑）
        pinia.setUploadedFile(file);
        // 跳转到预览页面
        router.push("/public/preview-video");
    } else {
        ElMessage({
            type: "error",
            message: "上传的文件不是视频类型，请上传有效的视频文件",
        });
    }
};

const showTip = () => {
    ElMessage({
        type: "info",
        message: "暂未处理哦！",
    });
};
</script>

<template>
    <div class="public" v-if="isAuthorized">
        <!-- <Header case="two" leftIcon="chevron-back-outline"></Header> -->
        <div class="img-box">
            <img src="@/assets/img/bg-svg.jpg" alt="img" />
        </div>
        <div class="content">
            <div class="public-video">
                <Upload mediaType="video" @videoFile="getVideoFile">
                    <CommonButton
                        label="发布视频"
                        :click="publicVideo"
                        icon="caret-back-circle-outline"
                    >
                    </CommonButton>
                </Upload>
            </div>
            <div class="public-photo">
                <CommonButton
                    :click="publicPhoto"
                    label="发布图片"
                    outline
                    icon="images-outline"
                    @click="showTip"
                ></CommonButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.public {
    width: 100%;
    height: 100%;

    .img-box {
        width: 100%;
        height: 50%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 100%;

        .public-video,
        .public-photo {
            width: 65%;
        }
    }
}
</style>
