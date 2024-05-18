<script setup lang="ts">
import HeaderSlot from "../../../components/header/HeaderSlot.vue";
</script>

<template>
    <div>
        <HeaderSlot>
            <template #left>
                <ion-icon name="chevron-back-outline"></ion-icon>
            </template>
            <template #center>
                <div style="font-size: 16px">求更新</div>
            </template>
            <template #right>
                <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
            </template>
        </HeaderSlot>
    </div>
</template>

<style scoped></style>
