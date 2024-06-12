<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";

// const showCenter = ref<boolean>(false);

const props = defineProps<{
    showPopup: boolean;
}>();

const showPopup = ref(props.showPopup);

const emit = defineEmits(["update:showPopup"]);

watch(
    () => props.showPopup,
    newVal => {
        showPopup.value = newVal;
    }
);

watch(showPopup, newVal => {
    emit("update:showPopup", newVal);
});
</script>

<!-- 这里的双向绑定需要处理-2024-06-11 -->
<template>
    <div>
        <van-popup v-model:show="showPopup" class="van-popop">
            <template #overlay-content>
                <div class="overlay-close" @click="showPopup = false"></div>
            </template>
            <!-- 插槽 -->

            <slot name="content"></slot>
        </van-popup>
    </div>
</template>

<style scoped lang="scss">
.van-popop {
    border-radius: var(--rounded);
}
</style>
