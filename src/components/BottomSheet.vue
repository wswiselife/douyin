<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    showPopup: boolean;
}>();

const showPopup = ref(props.showPopup);
const emit = defineEmits(["update:showPopup"]);

watch(
    () => props.showPopup,
    newVal => {
        // console.log(newVal);

        showPopup.value = newVal;
    }
);

watch(showPopup, newVal => {
    emit("update:showPopup", newVal);
});
</script>

<template>
    <div class="sheet">
        <van-popup
            v-model:show="showPopup"
            round
            position="bottom"
            :style="{ height: 'auto' }"
        >
            <template #overlay-content>
                <div class="overlay-close" @click="showPopup = false">关闭</div>
            </template>
            <div class="popup-content">
                <slot name="content"></slot>
            </div>
        </van-popup>
    </div>
</template>

<style scoped lang="scss"></style>
