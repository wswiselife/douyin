<script setup lang="ts">
import { useRouter } from "vue-router";
import EditUserInfoItem from "@/components/EditUserInfoItem.vue";

const router = useRouter();

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="edit-userinfo">
        <div class="background">
            <div class="cover">
                <img src="@/assets/img/background.png" alt="background" />
                <div class="header">
                    <div class="return" @click="goBack">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="change-cover">
                        <ion-icon name="image-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>

        <div class="message">
            <div class="avatar">
                <div class="img">
                    <img src="@/assets/img/avatar.png" alt="avatar" />

                    <div class="mark">
                        <ion-icon name="camera" class="icon"></ion-icon>
                        <div class="explain">更换头像</div>
                    </div>
                </div>
            </div>
            <div class="userinfo-list">
                <EditUserInfoItem
                    title="名字"
                    content="杨老虎"
                ></EditUserInfoItem>
                <EditUserInfoItem
                    title="抖音号"
                    content="12345xiaolaohu"
                ></EditUserInfoItem>
                <EditUserInfoItem
                    title="简介"
                    content="每晚12：00直播，记得来观看哦！能遇见你，是我这辈子最大的荣幸，很高兴认识你"
                ></EditUserInfoItem>
                <EditUserInfoItem title="性别" content="女"></EditUserInfoItem>
                <EditUserInfoItem
                    title="生日"
                    content="1998-04-15"
                ></EditUserInfoItem>
                <EditUserInfoItem
                    title="所在地"
                    content="广东-广州"
                ></EditUserInfoItem>
                <EditUserInfoItem
                    title="学校"
                    content="点击设置"
                ></EditUserInfoItem>
            </div>

            <div class="br"></div>

            <div class="edit-serve">
                <EditUserInfoItem title="编辑服务"></EditUserInfoItem>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.edit-userinfo {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    scroll-behavior: hidden;
}

.background {
    width: 100;
    height: 25%;

    .cover {
        position: relative;

        img {
            width: 100%;
            height: 100%;
            background-size: cover;
        }

        .header {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 1.2rem 1.6rem;
            font-size: 2.4rem;
            color: #fff;
        }
    }
}

.message {
    background-color: #fff;
    position: relative;
    border-radius: var(--rounded-md) var(--rounded-md) 0 0;
}

.avatar {
    position: absolute;
    top: 0;
    left: 50%;
    width: 120px;
    height: 120px;
    transform: translate(-50%, -50%);

    .img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);

        img {
            position: relative;
            width: 120px;
            height: 120px;
            padding: 5px;
            border-radius: 100%;
            background-color: #fff;
        }

        .mark {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 50%;
            width: 110px;
            height: 110px;
            color: #fff;
            border-radius: 100%;
            // background-color: rgba(0, 0, 0, 0.2);
            transform: translateX(-50%);

            .icon {
                font-size: 30px;
            }

            .explain {
                font-size: 14px;
            }
        }
    }
}

.userinfo-list {
    padding-top: 55px;
}

.br {
    width: 100%;
    height: 3px;
    background-color: #eee;
}

.edit-serve {
    padding-block: 12px;
}
</style>
