<script setup lang="ts">
import CommonButton from "@/components/CommonButton.vue";
import Header from "@/components/header/Header.vue";
const rightClick = () => {
    console.log("right click");
};

const sendPost = () => {
    console.log("send post");
};

const goLive = () => {
    console.log("go live");
};
</script>

<template>
    <div class="for-update">
        <Header
            case="one"
            leftIcon="chevron-back-outline"
            centerText="求更新"
            rightIcon="ellipsis-horizontal-outline"
            :rightClick="rightClick"
        ></Header>

        <div class="center">
            <!-- 中间部分 -->
            <div class="content">
                <div class="title">
                    <span>暂时还没有粉丝点击“求更新”</span>
                    <img
                        src="../../../assets/img/bg-svg.jpg"
                        alt="cover"
                        class="img"
                    />
                </div>
                <div class="subtitle">
                    当粉丝期待你的新作品时，会点击“求更新”提醒你
                </div>
            </div>
        </div>

        <!-- 底部 -->

        <div class="bottom">
            <CommonButton
                label="发布作品"
                :click="sendPost"
                outline
            ></CommonButton>
            <CommonButton label="去直播" :click="goLive"></CommonButton>
        </div>
    </div>
</template>

<style scoped>
.for-update {
    position: relative;
    width: 100%;
    height: 100%;

    .center {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 58px);

        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            .title {
                font-size: 16px;
                font-weight: 600;
                padding-block: 6px;

                .img {
                    position: absolute;
                    width: 100px;
                }
            }

            .subtitle {
                font-size: 14px;
            }
        }
    }

    .bottom {
        position: fixed;
        bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 25px;
        padding: 25px;
    }
}
</style>
