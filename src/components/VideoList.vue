<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
    videoList: Array<{ id: number; url: string; count: number }>;
}>();

const videoHandler = (id: number) => {
    console.log(id);
    router.push({ path: "/me/my-video", query: { videoId: id } });
};
</script>

<template>
    <div class="video-list">
        <div
            class="content"
            v-for="video in props.videoList"
            :key="video.id"
            @click="videoHandler(video.id)"
        >
            <div class="img-box">
                <img :src="video.url" alt="avatar" />
            </div>
            <div class="love-count">
                <div class="icon-box">
                    <ion-icon name="add"></ion-icon>
                </div>
                <div class="count">
                    {{ video.count }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.video-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px -10px;
    overflow-y: scroll;

    .content {
        width: calc(33.33% - 10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 20px;

        .img-box {
            width: 100%;
            height: 180px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .love-count {
            position: absolute;
            bottom: 10px;
            left: 10px;
            display: flex;
            align-items: center;

            .icon-box {
                margin-right: 5px;
            }
        }
    }
}
</style>
