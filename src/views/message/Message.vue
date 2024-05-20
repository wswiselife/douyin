<script setup lang="ts">
import HeaderSlot from "../../components/header/HeaderSlot.vue";
</script>

<template>
    <div class="message">
        <!-- <Headers fixed leftText="左侧" rightText="求更新"></Headers> -->

        <HeaderSlot>
            <template #left>
                <ion-icon name="chevron-back-outline"></ion-icon>
            </template>
            <template #center>
                <ion-icon name="camera-outline"></ion-icon>
            </template>
            <template #right>
                <ion-icon name="search-outline"></ion-icon>
            </template>
        </HeaderSlot>

        <!-- friends -->
        <!-- <div class="friends-content">
            <div class="friends-avatar">
                <img src="../../assets/img/avatar.png" alt="avatar" />
                <div class="name">lisi</div>
            </div>
            <div class="friends-avatar">
                <img src="../../assets/img/avatar.png" alt="avatar" />
                <div class="name">王楚</div>
            </div>
            <div class="friends-avatar">
                <img src="../../assets/img/avatar.png" alt="avatar" />
                <div class="name">wijdl</div>
            </div>
            <div class="friends-avatar">
                <img src="../../assets/img/avatar.png" alt="avatar" />
                <div class="name">状态管理</div>
            </div>
        </div> -->

        <!-- message list -->
        <div class="message-content">
            <div class="message-list">
                <div class="avatar">
                    <img src="../../assets/img/avatar.png" alt="" />
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

            <div class="message-list">
                <div class="avatar">
                    <img src="../../assets/img/avatar.png" alt="" />
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

            <div class="message-list">
                <div class="avatar">
                    <img src="../../assets/img/avatar.png" alt="" />
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
    </div>
</template>

<style scoped>
.message {
    /* padding-inline: 1.2rem; */
    height: 100%;
    width: 100%;
}

.friends-content {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 1.6rem;
}

.friends-avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.friends-avatar img {
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
}

.name {
    font-size: 14px;
}

.avatar img {
    width: 6rem;
    height: 6rem;
    border-radius: 100%;
}

.message-content {
    padding-top: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.message-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.6rem;
}

.message-box {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.subTitle {
    font-size: 14px;
}

.nomore {
    text-align: center;
    padding: 1.2rem;
    font-size: 1.4rem;
}
</style>
