<script setup lang="ts">
import HeaderSlot from "../../../components/header/HeaderSlot.vue";
</script>

<template>
    <div class="edit-userinfo">
        <HeaderSlot>
            <template #left>
                <ion-icon name="chevron-back-outline"></ion-icon>
            </template>

            <template #right>
                <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
            </template>
        </HeaderSlot>

        <div class="userinfo-list">
            <div class="item-box"><span>姓名：</span><span>xx</span></div>
            <div class="item-box"><span>简介：</span><span>xx</span></div>
            <div class="item-box"><span>性别：</span><span>xx</span></div>
            <div class="item-box"><span>生日：</span><span>xx</span></div>
            <div class="item-box"><span>所在地：</span><span>xx</span></div>
            <div class="item-box"><span>学校：</span><span>xx</span></div>
            <div class="item-box"><span>抖音号：</span><span>xx</span></div>
        </div>
    </div>
</template>

<style scoped></style>
