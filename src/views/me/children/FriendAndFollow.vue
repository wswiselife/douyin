<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
</script>

<template>
    <div class="container">
        <HeaderSlot class="slot">
            <template #center>
                <div class="list">
                    <div class="item">朋友</div>
                    <div class="item">关注</div>
                    <div class="item">粉丝</div>
                </div>
            </template>
            <template #right>
                <ion-icon
                    name="ellipsis-horizontal-outline"
                    class="right"
                ></ion-icon>
            </template>
        </HeaderSlot>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;

    .slot {
        .list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 30px;

            .item:first-child {
                padding: 5px;
                border-bottom: 2px solid black;
            }
        }
        .right {
            font-size: 24px;
        }
    }
}
</style>
