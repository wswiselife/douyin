<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
import { usePiniaStore } from "@/store/store";
import { ref, watch, onMounted } from "vue";

const { videoCoverFile } = usePiniaStore();
const pinia = usePiniaStore();
const imageUrl = ref<string | null>(null);
import CommonButton from "@/components/CommonButton.vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const handleFileUpload = (file: File) => {
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imageUrl.value = reader.result as string;
            // console.log("File converted to base64:", imageUrl.value);
        };
        reader.readAsDataURL(file);
    } else {
        // console.error("No file provided");
    }
};

onMounted(() => {
    // console.log("Component mounted. Current videoCoverFile:", videoCoverFile);
    if (videoCoverFile) {
        handleFileUpload(videoCoverFile);
    }
});
watch(
    videoCoverFile,
    (newVal, oldVal) => {
        // console.log("videoCoverFile changed:", newVal);
        if (newVal !== oldVal) {
            handleFileUpload(newVal);
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

/**
 * 返回上一步则取消选择
 */
const prevStep = () => {
    router.back();
    pinia.cancelImageFile();
    // console.log("videoCoverFile", videoCoverFile);
};

const nextStep = () => {
    router.back();
};

const reSelect = () => {
    ElMessage({
        message: "暂未实现，请取消再选。",
    });
};

const leftHandler = () => {
    pinia.cancelImageFile();
    // 退出有默认的事件，并不是完全自定义事件
    // console.log("videoCoverFile", videoCoverFile);
};
</script>

<template>
    <div class="cover">
        <HeaderSlot>
            <template #left>
                <ion-icon
                    name="chevron-back-outline"
                    @click="leftHandler"
                    class="left-icon"
                >
                </ion-icon>
            </template>
            <template #center>
                <div class="center">选封面</div>
            </template>
            <template #right>
                <div class="right" @click="reSelect">重新选择</div>
            </template>
        </HeaderSlot>

        <div class="image">
            <img :src="imageUrl" alt="封面图像" v-if="imageUrl" />
            <p v-else>图片无法加载，请选择一个有效的图片文件。</p>
        </div>

        <div class="bottom">
            <CommonButton :click="prevStep" label="取消" outline></CommonButton>
            <CommonButton :click="nextStep" label="确定"></CommonButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cover {
    width: 100%;
    height: 100%;
    position: relative;

    .left-icon {
        font-size: 26px;
    }

    .center {
        font-weight: 600;
    }

    .image {
        width: 100%;
        height: auto;
        img {
            width: 100%;
            height: auto;
            border: 1px solid #ccc;
        }
    }

    .bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 100%;
        padding: 25px;
    }

    .right {
        font-size: 14px;
        color: var(--secondly-color);
    }
}
</style>
