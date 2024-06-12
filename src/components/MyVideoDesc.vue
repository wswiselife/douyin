<script setup lang="ts">
import MyVideo from "./MyVideo.vue";
import { ref } from "vue";
import { usePiniaStore } from "@/store/store";
import { useRoute } from "vue-router";

const route = useRoute();

const piniaStore = usePiniaStore();

const videoId = ref(piniaStore.myVideoIdList);
console.log("videoId", videoId.value);

const startVideoIndex = ref(2);

const currentId = ref(route.query.videoId);
console.log("currentId", currentId.value);

if (currentId.value) {
    const index = videoId.value.findIndex(item => item.id === currentId.value);
    if (index !== -1) {
        startVideoIndex.value = index;
    }
}
</script>

<template>
    <div>
        <MyVideo
            :videoIdList="videoId"
            :startVideoIndex="startVideoIndex"
        ></MyVideo>
    </div>
</template>

<style scoped lang="scss"></style>
