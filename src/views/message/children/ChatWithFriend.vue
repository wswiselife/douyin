<script setup lang="ts">
import HeaderSlot from "@/components/header/HeaderSlot.vue";
import { useRoute } from "vue-router";
import { ref, nextTick, onMounted } from "vue";

const route = useRoute();

const userId = route.query.userId;
console.log("userId", userId);

const avatar = ref<string>(
    "https://s2.loli.net/2024/06/08/AkwLEavo15T2crQ.png"
);
const nickname = ref<string>("特拉法尔加.林故辞");

const chatContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

onMounted(() => {
    nextTick(() => {
        scrollToBottom();
    });
});
</script>

<template>
    <div class="chat-with-friend">
        <HeaderSlot class="slot">
            <template #center>
                <div class="center-box">
                    <div class="avatar">
                        <img :src="avatar" alt="avatar" />
                    </div>
                    <div class="nickname">
                        {{ nickname }}
                    </div>
                </div>
            </template>

            <template #right>
                <div class="right-box">
                    <div class="videochat">
                        <div class="icon">
                            <ion-icon name="videocam-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="more">
                        <div class="icon">
                            <ion-icon
                                name="ellipsis-horizontal-outline"
                            ></ion-icon>
                        </div>
                    </div>
                </div>
            </template>
        </HeaderSlot>

        <!-- 聊天框 -->
        <div class="chat">
            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">今天时端午节，端午节安康！</div>
            </div>

            <div class="message me">
                <div class="avatar">
                    <img :src="avatar" alt="my avatar" />
                </div>

                <div class="text">
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                </div>
            </div>

            <div class="message me">
                <div class="avatar">
                    <img :src="avatar" alt="my avatar" />
                </div>

                <div class="text">
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                </div>
            </div>

            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">你也是</div>
            </div>
            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛
                </div>
            </div>

            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛
                </div>
            </div>
            <div class="message me">
                <div class="avatar">
                    <img :src="avatar" alt="my avatar" />
                </div>

                <div class="text">
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                </div>
            </div>
            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛
                </div>
            </div>

            <div class="message me">
                <div class="avatar">
                    <img :src="avatar" alt="my avatar" />
                </div>

                <div class="text">
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                    谢谢你的祝福，你也要每天开开心心，健健康康哦！
                </div>
            </div>
            <div class="message he">
                <div class="avatar">
                    <img :src="avatar" alt="friend avatar" />
                </div>
                <div class="text">
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛 最近有龙舟比赛，要一起去看嘛
                    最近有龙舟比赛，要一起去看嘛
                </div>
            </div>
        </div>

        <!-- enter -->
    </div>
</template>

<style scoped lang="scss">
.chat-with-friend {
    width: 100%;
    height: 100%;
    .slot {
        .center-box {
            display: flex;
            justify-content: center;
            align-items: center;

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
        }

        .right-box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            .videochat,
            .more {
                display: flex;
                justify-content: center;
                align-items: center;

                .icon {
                    font-size: 22px;
                }
            }
        }
    }

    .chat {
        flex-grow: 1;
        padding: 10px;
        overflow-y: auto;
        display: flex;
        height: 80%;
        flex-direction: column;
        gap: 20px;

        .message {
            display: flex;
            align-items: flex-start;

            &.he {
                flex-direction: row;
            }

            &.me {
                flex-direction: row-reverse;
            }

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 100%;
                margin: 0 10px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }

            .text {
                max-width: 70%;
                padding: 10px;
                border-radius: 10px;
                background-color: #f1f1f1;
                word-wrap: break-word;
            }

            &.he .text {
                background-color: #e6e6e6;
            }

            &.me .text {
                background-color: #d1ffd1;
            }
        }
    }
}
</style>
