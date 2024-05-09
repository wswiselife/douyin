<script setup lang="ts">
import Headers from "../../components/header/Header.vue";
import HeaderSlot from "../../components/header/HeaderSlot.vue";
</script>

<template>
    <div class="message">
        <!-- <Headers fixed leftText="左侧" rightText="求更新"></Headers> -->
        <HeaderSlot>
            <template #left>
                <ion-icon name="chevron-back-outline"></ion-icon>
            </template>
            <template #center>
                <ion-icon name="camera-outline"></ion-icon>
            </template>
            <template #right>
                <ion-icon name="search-outline"></ion-icon>
            </template>
        </HeaderSlot>
    </div>
</template>

<style scoped></style>
