<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    leftCustomize?: boolean;
}>();
const goBack = () => {
    if (!props.leftCustomize) {
        router.back();
    }
};
</script>

<template>
    <div class="header">
        <div class="left-box slot" @click="goBack">
            <slot name="left">
                <ion-icon name="chevron-back-outline" class="icon"></ion-icon>
            </slot>
        </div>

        <div class="center-box slot">
            <slot name="center">center</slot>
        </div>

        <div class="right-box slot">
            <slot name="right">right</slot>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    gap: 5px;
    padding: 0.8rem 1.2rem;
}

.left-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-box {
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    /* width: 100%; */
    transform: translate(-50%, -50%);
}

.right-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    font-size: 2.4rem;
}
</style>
