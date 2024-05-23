<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
import Search from "@/components/Search.vue";
import CommonButton from "@/components/CommonButton.vue";

const loveClick = () => {};
</script>

<template>
    <div>
        <HeaderSlot>
            <template #left>
                <!-- 默认 -->
            </template>
            <template #center>
                <Search placeholder="搜索你赞过的视频"></Search>
            </template>
            <template #right> 搜索 </template>
        </HeaderSlot>

        <div class="content">
            <div class="title">选择搜索范围</div>

            <div class="select-list">
                <CommonButton
                    label="喜欢"
                    icon="heart-circle-outline"
                    :click="loveClick"
                    outline
                    small
                ></CommonButton>
                <CommonButton
                    label="收藏"
                    icon="star-outline"
                    :click="loveClick"
                    outline
                    small
                ></CommonButton>
                <CommonButton
                    label="作品"
                    icon="play-circle-outline"
                    :click="loveClick"
                    outline
                    small
                ></CommonButton>
                <CommonButton
                    label="私密"
                    icon="lock-closed-outline"
                    :click="loveClick"
                    outline
                    small
                ></CommonButton>
                <CommonButton
                    label="观看历史"
                    icon="time-outline"
                    :click="loveClick"
                    outline
                    small
                ></CommonButton>

                <!-- <div class="select-item">
                    <div class="icon-box">
                        <ion-icon name="love"></ion-icon>
                    </div>
                    <div class="label">喜欢</div>
                </div>
                <div class="select-item">
                    <div class="icon-box">
                        <ion-icon name="love"></ion-icon>
                    </div>
                    <div class="label">收藏</div>
                </div>
                <div class="select-item">
                    <div class="icon-box">
                        <ion-icon name="love"></ion-icon>
                    </div>
                    <div class="label">作品</div>
                </div>
                <div class="select-item">
                    <div class="icon-box">
                        <ion-icon name="love"></ion-icon>
                    </div>
                    <div class="label">私密</div>
                </div>
                <div class="select-item">
                    <div class="icon-box">
                        <ion-icon name="love"></ion-icon>
                    </div>
                    <div class="label">观看记录</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {
    padding: 12px;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: rgb(115, 115, 115);
        padding-bottom: 12px;
    }

    .select-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
}
</style>
