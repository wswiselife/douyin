<script setup lang="ts">
import CommonButton from "@/components/CommonButton.vue";
import CommonVertical from "@/components/CommonVertical.vue";
import Header from "@/components/header/Header.vue";

const topic = () => {
    console.log("topic");
};

const friend = () => {
    console.log("friend");
};

const save = () => {};

const publicVideo = () => {};
</script>

<template>
    <div class="create-video">
        <Header case="two" leftIcon="chevron-back-outline"></Header>

        <div class="info-box">
            <div class="info">
                <input
                    type="text"
                    class="input"
                    placeholder="添加作品描述..."
                />

                <div class="label">
                    <div class="label-box">
                        <CommonButton
                            label="#话题"
                            :click="topic"
                            outline
                            small
                        ></CommonButton>
                    </div>
                    <div class="label-box">
                        <CommonButton
                            label="@朋友"
                            :click="friend"
                            outline
                            small
                        ></CommonButton>
                    </div>
                </div>
            </div>

            <div class="cover">
                <img
                    src="@/assets/img/background.png"
                    alt="cover"
                    class="img"
                />
            </div>
        </div>

        <div class="option-lis">
            <CommonVertical
                leftIcon="location-outline"
                label="你在哪里"
            ></CommonVertical>
            <CommonVertical
                leftIcon="grid-outline"
                label="添加标签"
                content="添加位置"
            ></CommonVertical>
            <CommonVertical
                leftIcon="lock-open-outline"
                label="公开 · 所有粉丝可见"
            ></CommonVertical>
            <CommonVertical
                leftIcon="settings-outline"
                label="高级设置"
            ></CommonVertical>
        </div>

        <div class="bottom">
            <div class="bottom-box">
                <CommonButton
                    label="存草稿"
                    icon="file-tray-full-outline"
                    :click="save"
                    outline
                ></CommonButton>
            </div>

            <div class="bottom-box">
                <CommonButton
                    label="发布"
                    icon="arrow-up-circle-outline"
                    :click="publicVideo"
                ></CommonButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.create-video {
    position: relative;
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    .info-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        padding: 12px;
        width: 100%;
        height: 20%;

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: flex-start;
            // width: 100%;
            height: 100%;
            .input {
                flex: 1;
                width: 100%;
                // height: 100%;
                padding: 15px;
                border: none;
                outline: none;
            }

            .label {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 20px;
                width: 70%;

                .label-box {
                    width: 50%;
                }
            }
        }

        .cover {
            width: 150px;
            height: 120px;

            .img {
                width: 100%;
                height: 100%;
                border-radius: var(--rounded);
            }
        }
    }

    .bottom {
        position: fixed;
        bottom: 20px;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bottom-box {
            width: 45%;
        }
    }
}
</style>
