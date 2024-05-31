<script setup lang="ts">
import { onMounted, ref } from "vue";

import CommonButton from "@/components/CommonButton.vue";
import CommonVertical from "@/components/CommonVertical.vue";
import Header from "@/components/header/Header.vue";
import videoApi from "@/api/video.api.ts";
import { usePiniaStore } from "@/store/store";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

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
});

const cover = ref<string>("https://s2.loli.net/2024/05/11/hd7yZGNz68RJpI2.jpg");
const description = ref<string>("");
const videoFile = ref<any>();
/**
 * 发布视频
 */
const publicVideo = async () => {
    // console.log("videoFile.value", videoFile.value);

    const formData = new FormData();
    // file字段需要匹配后端
    formData.append("file", videoFile.value);
    formData.append("description", description.value);
    formData.append("cover", cover.value);

    const response = await videoApi.uploadVideoApi(formData);
    if (response.code === 200) {
        console.log(response.message);
        ElMessage({
            type: "success",
            message: "上传成功！3s后跳转首页",
        });
        setTimeout(() => {
            router.push("/home");
        }, 3000);
    }
};
</script>

<template>
    <div class="create-video">
        <Header case="two" leftIcon="chevron-back-outline"></Header>

        <div class="info-box">
            <div class="info">
                <input
                    type="text"
                    class="input"
                    placeholder="添加作品描述..."
                    v-model="description"
                />

                <div class="label">
                    <div class="label-box">
                        <CommonButton
                            label="#话题"
                            :click="topic"
                            outline
                            small
                        ></CommonButton>
                    </div>
                    <div class="label-box">
                        <CommonButton
                            label="@朋友"
                            :click="friend"
                            outline
                            small
                        ></CommonButton>
                    </div>
                </div>
            </div>

            <div class="cover">
                <img
                    src="@/assets/img/background.png"
                    alt="cover"
                    class="img"
                />
            </div>
        </div>

        <div class="option-lis">
            <CommonVertical
                leftIcon="location-outline"
                label="你在哪里"
            ></CommonVertical>
            <CommonVertical
                leftIcon="grid-outline"
                label="添加标签"
                content="添加位置"
            ></CommonVertical>
            <CommonVertical
                leftIcon="lock-open-outline"
                label="公开 · 所有粉丝可见"
            ></CommonVertical>
            <CommonVertical
                leftIcon="settings-outline"
                label="高级设置"
            ></CommonVertical>
        </div>

        <div class="bottom">
            <div class="bottom-box">
                <CommonButton
                    label="存草稿"
                    icon="file-tray-full-outline"
                    :click="save"
                    outline
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
        padding: 12px;
        width: 100%;
        height: 20%;

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: flex-start;
            // width: 100%;
            height: 100%;
            .input {
                flex: 1;
                width: 100%;
                // height: 100%;
                padding: 15px;
                border: none;
                outline: none;
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

            .img {
                width: 100%;
                height: 100%;
                border-radius: var(--rounded);
            }
        }
    }

    .bottom {
        position: fixed;
        bottom: 20px;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bottom-box {
            width: 45%;
        }
    }
}
</style>
