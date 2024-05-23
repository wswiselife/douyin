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
        <div class="header">
            <div class="people">大家都在搜：vue3</div>
            <div class="close" @click="pinia.change()">
                <ion-icon name="close-outline"></ion-icon>
            </div>
        </div>

        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
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
