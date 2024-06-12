<script setup lang="ts">
import { watch, ref } from "vue";
import { usePiniaStore } from "../store/store";
// import { storeToRefs } from "pinia";
import videoApi from "../api/video.api";

const pinia = usePiniaStore();

// const show = storeToRefs(pinia);

const Props = defineProps<{
    videoId: number;
}>();

const commentList = ref<any>([]);

const getComment = async () => {
    const response = await videoApi.getCommentApi(Props.videoId);
    if (response.code == 200) {
        console.log("comment-response", response);
        commentList.value = response.data;
    }
};

watch(
    () => pinia.showComment,
    newVal => {
        if (newVal) {
            getComment();
        }
    }
);
</script>

<template>
    <div class="comment" v-if="pinia.showComment">
        <div class="header">
            <div class="people">大家都在搜：vue3</div>
            <div class="close" @click="pinia.changeCommentShow()">
                <ion-icon name="close-outline"></ion-icon>
            </div>
        </div>

        <div class="content">
            <div
                class="comment-item"
                v-for="item in commentList"
                :key="item.comment_id"
            >
                {{ item.content }}
                <div class="time">
                    {{ item.create_time }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.comment {
    z-index: 999;
    width: 100%;
    height: 55%;
    background-color: #ffffff;
    border-radius: var(--rounded-md) var(--rounded-md) 0 0;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .close {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            font-size: 26px;
            color: rgb(105, 105, 105);
        }
    }
}
</style>
