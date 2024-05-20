<script setup lang="ts">
import { watch } from "vue";
import { usePiniaStore } from "../store/store";
import { storeToRefs } from "pinia";

const pinia = usePiniaStore();

const show = storeToRefs(pinia);

watch(
    () => pinia.showComment,
    (newVal, oldVal) => {
        console.log("newVal", newVal);
        console.log("oldVal", oldVal);
        console.log("show", show);
    }
);
</script>

<template>
    <div class="comment" v-if="pinia.showComment">
        comment

        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
        <div>xxx</div>
    </div>
</template>

<style scoped>
.comment {
    z-index: 999;
    width: 100%;
    height: 500px;
    background-color: #c71b1b;
}
</style>
