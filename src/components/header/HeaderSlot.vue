<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
    router.back();
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
            <slot name="right" >right</slot>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}

.icon {
    font-size: 2.4rem;
}
</style>
