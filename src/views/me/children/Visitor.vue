<script setup lang="ts">
import HeaderSlot from "../../../components/header/HeaderSlot.vue";
</script>

<template>
    <div>
        <HeaderSlot>
            <template #left></template>

            <template #center>
                <div>主页访客</div>
            </template>

            <template #right>
                <div>设置</div>
            </template>
        </HeaderSlot>
    </div>
</template>

<style scoped></style>
