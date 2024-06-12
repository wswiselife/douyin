<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { usePiniaStore } from "@/store/store";
import CommonButton from "@/components/CommonButton.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const piniaStore = usePiniaStore();
// base64
// 文件-2024-06-11
const { videoBase64File, uploadedFile } = storeToRefs(piniaStore);

const router = useRouter();
const prevStep = () => {
    // console.log("prev-step");
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
// watch(
//     videoBase64File,
//     (newVal, oldVal) => {
//         if (newVal !== oldVal) {
//             // console.log("newVal", newVal);
//             blobToVideo();
//         }
//     },
//     {
//         deep: true,
//         immediate: true,
//     }
// );

const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64Data = reader.result as string;
        videoBase64File.value = base64Data;
        videoBlob.value = base64Data;
    };
    reader.onerror = error => {
        console.error("File reading error:", error);
    };
};

// 文件类型
watch(
    uploadedFile,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            // console.log("newVal", newVal);
            // blobToVideo();
            handleFileUpload(newVal);
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
            style="width: 100%; height: 80%"
            controls
        ></video>
        <div class="operate">
            <CommonButton
                :click="prevStep"
                label="上一步"
                outline
            ></CommonButton>
            <CommonButton :click="nextStep" label="下一步"></CommonButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    .operate {
        display: flex;

        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 85%;
    }
}
</style>
