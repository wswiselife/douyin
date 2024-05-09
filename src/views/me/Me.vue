<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const navigateTo = (url: String) => {
    router.push(url);
};
</script>

<template>
    <div class="me">
        <!-- 背景 -->
        <div class="background">
            <div class="background-header">
                <span>
                    <ion-icon
                        name="image-outline"
                        class="backgrond-icon"
                    ></ion-icon>
                </span>
                <div class="usermenu">
                    <!-- 求更新 -->
                    <span>
                        <!-- <img src="../../assets/icon/finger-right.png" alt="" /> -->
                        <ion-icon
                            @click="navigateTo('/me/for-update')"
                            name="paper-plane-outline"
                            class="usermenu-icon"
                        ></ion-icon>
                    </span>

                    <!-- 主页访客 -->
                    <span>
                        <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                        <ion-icon
                            @click="navigateTo('/me/visitor')"
                            name="people-outline"
                            class="usermenu-icon"
                        ></ion-icon>
                    </span>
                    <span>
                        <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                        <ion-icon
                            name="search-outline"
                            class="usermenu-icon"
                        ></ion-icon>
                    </span>
                    <span>
                        <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                        <ion-icon
                            name="reorder-three-outline"
                            class="usermenu-icon"
                        ></ion-icon>
                    </span>
                </div>
            </div>
            <div class="background-introduction">
                <div class="introduction-box">
                    <div class="avatar">
                        <img src="../../assets/img/avatar.png" alt="avatar" />
                    </div>
                    <div class="introduction">
                        <div class="name">简至</div>
                        <div class="douyin-code">
                            <span>抖音号：</span>
                            <span>jianzhi2001</span>
                            <span class="qr-code">
                                <ion-icon name="qr-code-outline"></ion-icon>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主体 -->
        <div class="content">
            <!-- 互动 -->
            <div class="information">
                <div class="information-box">
                    <div>
                        <span>124</span>
                        <span>获赞</span>
                    </div>
                    <div>
                        <span>3778</span>
                        <span>朋友</span>
                    </div>
                    <div>
                        <span>69</span>
                        <span>关注</span>
                    </div>
                    <div>
                        <span>173.2万</span>
                        <span>粉丝</span>
                    </div>
                </div>
            </div>

            <!-- 介绍 -->
            <div class="description-box">
                <div class="description">
                    <div>每晚12：00直播，记得来观看哦！</div>
                    <div>商务v:jockers</div>
                    <div>谢谢关注宝宝的每一位小可爱啊！</div>
                </div>
                <div class="description-other">
                    <div class="sex">女</div>
                    <div class="address">广东-广州</div>
                    <div class="university">中山大学</div>
                </div>
            </div>

            <!-- 更多 -->
            <div class="more">
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="bag-handle-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>抖音商城</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="musical-notes-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>我的音乐</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="people-outline" class="icon"></ion-icon>
                    </div>
                    <div>我的群聊</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="grid-outline" class="icon"></ion-icon>
                    </div>

                    <div>查看更多</div>
                </div>
            </div>

            <!-- 资料编辑/添加好友 -->
            <div class="edit-box">
                <!-- 添加朋友 -->
                <div class="add-friends">添加朋友</div>
                <!-- 编辑资料 -->
                <div class="edit">编辑资料</div>
            </div>

            <!-- 视频 -->
            <div class="video-content">
                <!-- 分类 -->
                <div class="video-classify">
                    <div>作品</div>
                    <div>私密</div>
                    <div>喜欢</div>
                    <div>收藏</div>
                </div>
                <!-- 视频 -->
                <div class="video-box"></div>

                <!-- 没有更多 -->
                <div class="bottom">暂时没有更多</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.me {
    position: relative;
}

.background {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 22rem;
    padding: 1rem 1.8rem;
    background-image: url(../../assets/img/background.png);
    color: var(--white);
}

.background-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.backgrond-icon {
    font-size: 2.6rem;
}

.usermenu {
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 1.2rem;
}

.usermenu-icon {
    font-size: 20px;
    background-color: #9f9f9f;
    padding: 0.5rem;
    border-radius: 100%;
}

.background-introduction {
    flex: 1;
    display: flex;
    align-items: center;
}

.introduction-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
}

.avatar img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
}

.description-other {
    display: flex;
    gap: 1rem;
}

.content {
    position: absolute;
    top: 21rem;
    width: 100%;
    border-radius: var(--rounded-md) var(--rounded-md) 0 0;
    background-color: var(--white);
    color: var(--black);
    padding: 1.6rem 1.2rem;
    font-size: 14px;
}

.information {
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.information-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
}

.description-box {
    padding-top: 1.2rem;
    color: #ccc;
    font-size: 1.2rem;
}

.more {
    padding-top: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.more-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

.icon-box {
    text-align: center;
}

.icon {
    font-size: 2.6rem;
}

.edit-box {
    margin-top: 1.6rem;
    display: flex;
    gap: 1.2rem;
    text-align: center;
}

.add-friends {
    flex: 1;
    padding: 0.8rem 0;
    background-color: #ccc;
    border-radius: var(--rounded);
}

.edit {
    flex: 1;
    padding: 0.8rem 0;
    background-color: #ccc;
    border-radius: var(--rounded);
}

.video-content {
    padding-top: 1.6rem;
}

.video-classify {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0 1.6rem;
}

.bottom {
    margin: 1.5rem;
    border: var(--border-gray);
    padding: 1.5rem 2rem;
    text-align: center;
}
</style>
