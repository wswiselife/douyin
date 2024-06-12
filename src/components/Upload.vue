<script setup lang="ts">
import { usePiniaStore } from "@/store/store";

const piniaStore = usePiniaStore();

// const props = defineProps<{
//     mediaType: string;
// }>();

const emit = defineEmits(["videoFile"]);

const videoFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        const uploadFile = files[0];
        // 存储在indexDB中
        // piniaStore.videoFile = uploadedFile;
        // console.log("files[0]", files[0]);

        // 替换方案-转base64存store
        let reader = new FileReader();
        // let videoBase64File = reader.readAsDataURL(uploadFile);

        reader.onload = e => {
            // 存储视频/图片
            piniaStore.setVideoBase64File(e.target.result);
        };

        // 存储文件形式的file
        // 如果选择的是视频，则存起来，改成在调用的地方实现-2024-06-11
        // console.log("videoBase64File.length", piniaStore.videoBase64File);
        // 传递父组件--这里需要一直传递数据，不方便
        emit("videoFile", uploadFile);
    }
};
</script>

<template>
    <div>
        <label for="upload">
            <slot></slot>
        </label>
        <input
            type="file"
            @change="videoFile"
            id="upload"
            style="display: none"
        />
    </div>
</template>

<style scoped lang="scss"></style>
