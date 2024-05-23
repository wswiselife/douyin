<script setup lang="ts">
import BasicVideo from "@/components/BasicVideo.vue";
import { storeToRefs } from "pinia";
import Comment from "../../components/Comment.vue";

import { usePiniaStore } from "@/store/store";
const piniaStore = usePiniaStore();

const pinia = storeToRefs(piniaStore);

console.log("pinia.$state", pinia.showComment);

const commentHandle = () => {
    console.log("click comment");
    piniaStore.change();
    // console.log("piniaStore", pinia.showComment);
    // pinia.showComment = !pinia.showComment;
    // console.log("piniaStore222", pinia.showComment);
};
</script>

<template>
    <div class="home">
        <BasicVideo class="video"></BasicVideo>
        <div class="box">
            <!-- 右侧交互栏 -->
            <div class="right-col">
                <div class="avatar">
                    <img src="@/assets/img/avatar.png" alt="" />
                    <div class="concern">
                        <ion-icon name="add-circle"></ion-icon>
                    </div>
                </div>
                <div class="icon">
                    <ion-icon name="heart"></ion-icon>
                    <div class="num">45.2万</div>
                </div>
                <div class="icon" @click="commentHandle">
                    <ion-icon name="chatbubble-ellipses"></ion-icon>
                    <div class="num">2754</div>
                </div>
                <div class="icon">
                    <ion-icon name="star"></ion-icon>
                    <div class="num">1.4万</div>
                </div>
                <div class="icon">
                    <ion-icon name="arrow-redo"></ion-icon>
                    <div class="num">1.4万</div>
                </div>
                <div class="icon">
                    <ion-icon name="musical-notes"></ion-icon>
                </div>
            </div>

            <div class="message">
                <div class="nickname">@芊芊龍</div>
                <div class="description">
                    <span>深情难免害怕，送给大家</span>
                    <span class="label">#vlog#马来西亚#翻唱</span>
                </div>
            </div>

            <div class="related">
                <div class="title-box">
                    <ion-icon name="search-outline"></ion-icon>
                    <div class="title">相关搜索 · 芊芊龍路人视角</div>
                </div>
                <div class="enter-box">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>

            <div class="progress"></div>
        </div>

        <!-- 评论 -->
        <Comment class="comment"></Comment>
    </div>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    // padding: 10px;
    background-color: #000000;

    .video {
        position: absolute;
        top: 0;
        bottom: 58px;
        width: 100%;
    }

    .comment {
        position: absolute;
        // top: 10px;
        bottom: 58px;
        width: 100%;
        // height: 200px;
    }
}

.box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 58px;
    color: var(--white);

    .right-col {
        z-index: 16;
        position: fixed;
        bottom: calc(58px + 2px + 28px + 10px);
        // bottom: 0px;
        right: 0;
        width: auto;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        margin-right: 10px;

        .avatar {
            position: relative;
            width: 55px;
            height: 55px;
            padding: 2px;
            background-color: #fff;
            border-radius: 100%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }

            .concern {
                position: absolute;
                left: 50%;
                bottom: -14px;
                transform: translateX(-50%);
                font-size: 20px;
                color: var(--primary-color);
            }
        }

        .icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 36px;

            .num {
                font-size: 14px;
            }
        }
    }

    .message {
        z-index: 16;
        position: fixed;
        bottom: calc(58px + 28px);
        left: 0;
        right: 0;
        height: auto;
        padding: 0 12px;
        .nickname {
            font-size: 16px;
            font-weight: 600;
        }

        .description {
            padding-block: 10px;
        }
    }

    .related {
        z-index: 16;
        position: fixed;
        bottom: 58px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        padding-inline: 12px;
        font-size: 14px;
        background-color: rgba($color: #d0c8c8, $alpha: 0.5);

        .title-box {
            display: flex;
            align-items: center;
        }
    }

    .progress {
        position: fixed;
        bottom: 58px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #b80505;
    }
}
</style>
