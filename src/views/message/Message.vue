<script setup lang="ts">
import { ref } from "vue";
import HeaderSlot from "../../components/header/HeaderSlot.vue";
import { usePiniaStore } from "@/store/store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import BottomSheet from "@/components/BottomSheet.vue";

const router = useRouter();
const piniaStore = usePiniaStore();

const { myInfo } = storeToRefs(piniaStore);

const showOperate = ref<boolean>(false);
const showDialog = () => {
    showOperate.value = !showOperate.value;
};

const navigateTo = (path: string, query?: string) => {
    router.push({
        path,
        query: {
            userId: query,
        },
    });
};

// 2024-06-12
onMounted(() => {
    // console.log("myInfo", myInfo.value);
});

const showStatusPopup = ref<boolean>(false);
const showStatus = () => {
    showStatusPopup.value = true;
};

const isShowTip = ref<boolean>(false);
const showTipContent = ref<string>("");
const showTip = () => {
    isShowTip.value = true;
    showTipContent.value = "发时刻相机";
    setTimeout(() => {
        isShowTip.value = false;
    }, 2000);
};
</script>

<template>
    <div class="message">
        <!-- <Headers fixed leftText="左侧" rightText="求更新"></Headers> -->

        <HeaderSlot class="slot" leftCustomize>
            <template #left>
                <div class="left">
                    <div class="icon-box">
                        <ion-icon
                            name="add"
                            class="icon"
                            @click="showDialog"
                        ></ion-icon>
                    </div>
                    <div class="operate" v-if="showOperate">
                        <div class="item">
                            <div class="icon-box">
                                <ion-icon name="chatbubbles-outline"></ion-icon>
                            </div>
                            <div class="title">发起群聊</div>
                        </div>
                        <div class="item">
                            <div class="icon-box">
                                <ion-icon name="person-add-outline"></ion-icon>
                            </div>
                            <div class="title">添加朋友</div>
                        </div>
                        <div class="item">
                            <div class="icon-box">
                                <ion-icon name="scan-outline"></ion-icon>
                            </div>
                            <div class="title">扫一扫</div>
                        </div>
                    </div>
                </div>
            </template>
            <template #center>
                <ion-icon
                    name="camera-outline"
                    class="icon"
                    @click="showTip"
                ></ion-icon>
            </template>
            <template #right>
                <ion-icon
                    name="search-outline"
                    class="icon"
                    @click="navigateTo('/message/search')"
                ></ion-icon>
            </template>
        </HeaderSlot>

        <!-- <Header case="one"></Header> -->

        <!-- friends -->
        <div class="friends-content">
            <div class="friends-avatar" @click="showTip">
                <div class="status-box">
                    <div class="avatar">
                        <img :src="myInfo.avatar" alt="avatar" />
                    </div>
                    <div
                        class="status"
                        :style="{ backgroundColor: '#fc2f56' }"
                    ></div>
                </div>
                <div class="name">发时刻</div>
            </div>
            <div
                class="friends-avatar"
                @click="navigateTo('/message/chat-with-friend', '1001')"
            >
                <div class="status-box">
                    <div class="avatar">
                        <img src="../../assets/img/avatar.png" alt="avatar" />
                    </div>
                    <div
                        class="status"
                        :style="{ backgroundColor: '#ff758f' }"
                    ></div>
                </div>
                <div class="name">特拉法尔加.林故辞</div>
            </div>

            <div class="friends-avatar" @click="showStatus">
                <div class="status-box setting">
                    <div class="avatar">
                        <img
                            src="../../assets/img/message/setting.png"
                            alt="avatar"
                        />
                    </div>
                    <div class="status"></div>
                </div>
                <div class="name">状态设置</div>
            </div>
        </div>

        <!-- message list -->
        <div class="message-content">
            <div
                class="message-list"
                @click="navigateTo('/message/system-chat')"
            >
                <div class="avatar">
                    <img src="../../assets/img/message/msg-icon1.png" alt="" />
                </div>
                <div class="message-box">
                    <div>
                        <div class="title">新朋友</div>
                        <div class="subTitle">没有新通知</div>
                    </div>
                    <div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>

            <div
                class="message-list"
                @click="navigateTo('/message/system-chat')"
            >
                <div class="avatar">
                    <img src="../../assets/img/message/msg-icon2.png" alt="" />
                </div>
                <div class="message-box">
                    <div>
                        <div class="title">互动消息</div>
                        <div class="subTitle">简至 给你的消息点赞</div>
                    </div>
                    <div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>

            <div
                class="message-list"
                @click="navigateTo('/message/system-chat')"
            >
                <div class="avatar">
                    <img src="../../assets/img/message/msg-icon5.webp" alt="" />
                </div>
                <div class="message-box">
                    <div>
                        <div class="title">抖音小助手</div>
                        <div class="subTitle">#今天谁请客呢 · 星期四</div>
                    </div>
                    <div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>

            <div
                class="message-list"
                @click="navigateTo('/message/system-chat')"
            >
                <div class="avatar">
                    <img src="../../assets/img/message/msg-icon4.png" alt="" />
                </div>
                <div class="message-box">
                    <div>
                        <div class="title">和你的朋友建个群聊吧</div>
                        <div class="subTitle">邀请好友进行聊天</div>
                    </div>
                    <div>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>

        <!-- 没有更多 -->
        <div class="nomore">暂时没有更多了</div>

        <BottomSheet
            class="status-sheet"
            :showPopup="showStatusPopup"
            @update:showPopup="val => (showStatusPopup = val)"
        >
            <template #content>
                <div class="sheet-content">
                    <div class="top">
                        <ioc-icon name="add"></ioc-icon>
                    </div>
                    <div class="avatar">
                        <div class="avatar-box">
                            <img :src="myInfo.avatar" alt="" />
                        </div>
                        <div class="title">在线状态</div>
                        <div class="desc">
                            开启后，互关朋友可以看到对方的在线状态，群聊中会展示在线人数
                        </div>
                    </div>
                    <div class="setting">
                        <div class="setting-item">
                            <div class="icon-box">
                                <ion-icon name="add"></ion-icon>
                            </div>
                            <div class="text">开启在线状态</div>
                        </div>
                        <div class="setting-item">
                            <div class="icon-box">
                                <ion-icon name="add"></ion-icon>
                            </div>
                            <div class="text">不给谁看</div>
                        </div>
                        <div class="setting-item">
                            <div class="icon-box">
                                <ion-icon name="add"></ion-icon>
                            </div>
                            <div class="text">
                                <div class="text-title">
                                    密友可见 · <span>0</span> 人
                                </div>
                                <div class="text-icon">
                                    <ion-icon name="add"></ion-icon>
                                </div>
                            </div>
                        </div>
                        <div class="setting-item">
                            <div class="icon-box">
                                <ion-icon name="add"></ion-icon>
                            </div>
                            <div class="text">部分可见</div>
                        </div>
                        <div class="setting-item">
                            <div class="icon-box">
                                <ion-icon name="add"></ion-icon>
                            </div>
                            <div class="text">关闭在线状态</div>
                        </div>
                    </div>
                </div>
            </template>
        </BottomSheet>

        <div class="show-tip" v-if="isShowTip">
            {{ showTipContent }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.message {
    /* padding-inline: 1.2rem; */
    height: 100%;
    width: 100%;
    background-color: #f8f8f9;
    position: relative;

    .slot {
        height: 42px;

        .icon {
            font-size: 24px;
        }

        .left {
            position: relative;

            .icon-box {
                font-weight: 700;
                .icon {
                    font-size: 24px;
                }
            }
            .operate {
                z-index: 16;
                position: absolute;
                top: 35px;
                left: -5px;
                width: 150px;
                background-color: #fff;
                border-radius: var(--rounded);
                box-shadow: var(--shadow);

                .item {
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    .icon-box {
                        font-size: 20px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .title {
                        font-size: 16px;
                    }
                }

                .item:not(:last-child) {
                    border-bottom: 1px solid #ddd;
                }
            }
        }
    }

    .friends-content {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: 1.6rem;
        width: 100%;
        padding: 12px;
        overflow-x: scroll;

        .friends-avatar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;

            .status-box {
                position: relative;

                .avatar {
                    width: 8rem;
                    height: 8rem;
                    border-radius: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .status {
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                    width: 18px;
                    height: 18px;
                    border-radius: 100%;
                }
            }

            .setting {
                .avatar {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba($color: #ccc, $alpha: 0.6);
                    img {
                        width: 34px;
                        height: 34px;
                    }
                }
            }

            .name {
                font-size: 14px;
                width: 80%;
                max-width: 80px;
                text-align: center;
                white-space: nowrap; /* Prevent text from wrapping */
                overflow: hidden; /* Hide overflowed text */
                text-overflow: ellipsis; /* Show ellipsis (...) for overflowed text */
            }
        }

        .avatar img {
            width: 6rem;
            height: 6rem;
            border-radius: 100%;
        }
    }

    .message-content {
        padding-top: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 20px;

        .message-list {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1.6rem;

            .avatar {
                width: 6rem;
                height: 6rem;
                border-radius: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }

            .message-box {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .subTitle {
                    font-size: 14px;
                }
            }
        }
    }

    .nomore {
        text-align: center;
        padding: 1.2rem;
        font-size: 1.4rem;
    }

    // 状态管理
    .show-tip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        background-color: var(--tip-bg);
        padding: 5px 10px;
        font-size: 12px;
        border-radius: var(--rounded);
    }
}
</style>
