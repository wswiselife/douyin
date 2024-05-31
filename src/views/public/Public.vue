<script setup lang="ts">
import CommonButton from "@/components/CommonButton.vue";
// import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import Upload from "@/components/Upload.vue";

const router = useRouter();

// 不做处理
const publicVideo = () => {};

const publicPhoto = () => {
    console.log("photo");
};

const getVideoFile = (file: any) => {
    if (file) {
        // console.log("file", file);
        router.push("/public/preview-video");
    }
};
</script>

<template>
    <div class="public">
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
