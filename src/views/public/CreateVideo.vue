<script setup lang="ts">
import { onMounted, ref } from "vue";

import CommonButton from "@/components/CommonButton.vue";
import CommonVertical from "@/components/CommonVertical.vue";
import Header from "@/components/header/Header.vue";
import videoApi from "@/api/video.api.ts";
import { usePiniaStore } from "@/store/store";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Upload from "@/components/Upload.vue";

const piniaStore = usePiniaStore();
const router = useRouter();

const topic = () => {
    console.log("topic");
};

const friend = () => {
    console.log("friend");
};
/**
 * 存草稿
 */
const save = () => {};

const getPiniaVideoFile = () => {
    videoFile.value = piniaStore.uploadedFile;
};

onMounted(() => {
    getPiniaVideoFile();
    hasCover();
});

const cover = ref<any>();
const description = ref<string>("");
const videoFile = ref<any>();
/**
 * 发布视频
 */
const publicVideo = async () => {
    // console.log("videoFile.value", videoFile.value);

    // 视频校验
    if (!description.value) {
        ElMessage({
            message: "描述不能为空哦！",
            type: "error",
        });
        return;
    }
    if (!cover.value) {
        ElMessage({
            message: "封面不能为空哦！",
            type: "error",
        });
        return;
    }
    if (!videoFile.value) {
        ElMessage({
            message: "视频不能为空哦！",
            type: "error",
        });
        return;
    }

    const formData = new FormData();
    // file字段需要匹配后端
    formData.append("video", videoFile.value);
    formData.append("description", description.value);
    formData.append("image", cover.value);

    const response = await videoApi.uploadVideoApi(formData);
    if (response.code === 200) {
        console.log(response.message);
        ElMessage({
            type: "success",
            message: "上传成功！3s后跳转首页",
        });
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }
};

const cancelInput = () => {
    description.value = "";
};

const selectCover = (file: any) => {
    // console.log("selsect", file);
    // 检查文件是否存在
    if (!file || !file.type) {
        ElMessage({
            type: "info",
            message: "文件无效，请重新选择！",
        });
        return;
    }

    // 定义图片文件类型
    const imageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
    ];

    // 检查文件类型是否为图片类型
    if (imageTypes.includes(file.type)) {
        // 存储视频文件（这里你可以实现具体的存储逻辑）
        piniaStore.setImageFile(file);
        // 跳转到预览页面
        router.push("/public/preview-cover");
    } else {
        ElMessage({
            type: "error",
            message: "上传的文件不是图片类型，请上传有效的图片文件",
        });
    }
};

// 将store的数据进行渲染
const imageUrl = ref<string | null>(null);
const hasCover = () => {
    let file = piniaStore.videoCoverFile;
    // 同时将file给cover
    cover.value = file;
    // console.log("cover.value", file);
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imageUrl.value = reader.result as string;
            // console.log("File converted to base64:", imageUrl.value);
        };
        reader.readAsDataURL(file);
    }
};

const todo = () => {
    ElMessage({
        message: "暂未处理哦！",
    });
};
</script>

<template>
    <div class="create-video">
        <Header case="two" leftIcon="chevron-back-outline"></Header>

        <div class="info-box">
            <div class="info">
                <div class="content-box">
                    <textarea
                        class="input"
                        placeholder="添加作品描述..."
                        v-model="description"
                    >
                    </textarea>
                    <div class="cancel" @click="cancelInput">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                </div>

                <div class="label">
                    <div class="label-box">
                        <CommonButton
                            label="#话题"
                            :click="topic"
                            outline
                            small
                            @click="todo"
                        ></CommonButton>
                    </div>
                    <div class="label-box">
                        <CommonButton
                            label="@朋友"
                            :click="friend"
                            outline
                            small
                            @click="todo"
                        ></CommonButton>
                    </div>
                </div>
            </div>

            <div class="cover">
                <Upload @videoFile="selectCover">
                    <div class="img-box">
                        <img
                            src="@/assets/img/avatar.png"
                            alt="cover"
                            class="img"
                            v-if="!imageUrl"
                        />
                        <img :src="imageUrl" alt="cover" class="img" v-else />
                    </div>
                    <div class="title">选封面</div>
                </Upload>
            </div>
        </div>

        <div class="option-lis">
            <CommonVertical
                leftIcon="location-outline"
                label="你在哪里"
                @click="todo"
            ></CommonVertical>
            <CommonVertical
                leftIcon="grid-outline"
                label="添加标签"
                content="添加位置"
                @click="todo"
            ></CommonVertical>
            <CommonVertical
                leftIcon="lock-open-outline"
                label="公开 · 所有粉丝可见"
                @click="todo"
            ></CommonVertical>
            <CommonVertical
                leftIcon="settings-outline"
                label="高级设置"
                @click="todo"
            ></CommonVertical>
        </div>

        <div class="bottom">
            <div class="box-bot">
                <div class="bottom-box">
                    <CommonButton
                        label="存草稿"
                        icon="file-tray-full-outline"
                        :click="save"
                        outline
                        @click="todo"
                    ></CommonButton>
                </div>

                <div class="bottom-box">
                    <CommonButton
                        label="发布"
                        icon="arrow-up-circle-outline"
                        :click="publicVideo"
                    ></CommonButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.create-video {
    position: relative;
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;

    .info-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        padding: 0 12px;
        width: 100%;
        height: 20%;

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: flex-start;
            // width: 100%;
            padding: 0;
            height: 100%;

            .input {
                height: 100px; /* 设置输入框的高度为两行 */
                resize: none; /* 防止用户调整输入框大小 */
                font-family: "Roboto", sans-serif;
                border: none;
                outline: none;
                padding: 10px;
                font-weight: 500;
                caret-color: var(--primary-color);
            }

            .input::placeholder {
                /* 将占位符置于第一行 */
                position: absolute;
                top: 10px; /* 调整占位符在第一行的位置 */
                left: 10px;
                pointer-events: none;
                color: #aaa;
                transition: top 0.3s, font-size 0.3s;
            }

            .input:focus::placeholder,
            .input:not(:placeholder-shown)::placeholder {
                /* 当输入框聚焦或有内容时，将占位符向上移动 */
                top: -20px; /* 调整占位符的位置 */
                font-size: 14px; /* 调整占位符的大小 */
            }
            // .input {
            //     flex: 1;
            //     width: 100%;
            //     // height: 100%;
            //     padding: 15px;
            //     border: none;
            //     outline: none;
            // }

            .content-box {
                position: relative;

                .input {
                    position: absolute;
                    width: 100%;
                    top: 0;
                    bottom: 0;
                }

                .cancel {
                    position: absolute;
                    top: 80px;
                    // bottom: 0;
                    right: 0;
                    padding: 5px;
                }
            }

            .label {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 20px;
                width: 70%;

                .label-box {
                    width: 50%;
                }
            }
        }

        .cover {
            width: 150px;
            height: 120px;
            position: relative;

            .img-box {
                position: absolute;
                top: 0;
                bottom: 0;
                .img {
                    width: 100%;
                    height: 100%;
                    border-radius: var(--rounded);
                    object-fit: cover;
                }
            }

            .title {
                position: absolute;
                bottom: 0;
                width: 100%;
                color: white;
                background-color: rgba($color: #a0a0a0, $alpha: 0.5);
                text-align: center;
                padding: 3px;
            }
        }
    }

    .bottom {
        // width: 100%;
        // height: 100%;
        // position: relative;
        // display: flex;
        // justify-content: space-between;
        position: fixed;
        bottom: 20px;
        width: 100%;
        // padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .box-bot {
            position: fixed;
            bottom: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 20px;
            // margin-bottom: 60px;
            .bottom-box {
                width: 100%;
            }
        }
    }
}
</style>
