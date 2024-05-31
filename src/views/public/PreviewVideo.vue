<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { usePiniaStore } from "@/store/store";
import CommonButton from "@/components/CommonButton.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const piniaStore = usePiniaStore();
const { videoBase64File } = storeToRefs(piniaStore);

const router = useRouter();
const prevStep = () => {
    console.log("prev-step");
    router.back();
};
const nextStep = () => {
    router.push("/public/create-video");
};

const videoBlob = ref<string>();
// 将blob处理成视频
const blobToVideo = () => {
    // console.log("piniaStore.", piniaStore.videoBase64File);
    // 处理成响应式数据
    // console.log("videoBase64File.value", videoBase64File.value);
    // imgSrc.value = videoBase64File.value;
    // 这里的视频重新上传之后还是上次的视频，并没有切换过来
    videoBlob.value = videoBase64File.value;
};

// 监听 store 中的 videoBase64File 变化并更新视频
watch(
    videoBase64File,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            // console.log("newVal", newVal);
            blobToVideo();
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

onMounted(() => {
    blobToVideo();
});
</script>

<template>
    <div class="content">
        <!-- <img :src="imgSrc" alt="" /> -->
        <!-- video -->
        <video
            :src="videoBlob"
            style="width: 100%; height: 70%"
            controls
        ></video>
        <CommonButton :click="prevStep" label="上一步" outline></CommonButton>
        <CommonButton :click="nextStep" label="下一步"></CommonButton>
    </div>
</template>

<style scoped lang="scss">
.content {
    width: 100%;
    height: 100%;
}
</style>
