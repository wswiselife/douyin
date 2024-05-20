<script setup lang="ts">
import CommonButton from "@/components/CommonButton.vue";
import Header from "@/components/header/Header.vue";

const rightClick = () => {
    console.log("色湖之");
};

const openVisitor = () => {
    console.log("open visitor");
};

const keepClose = () => {
    console.log("keep close");
};
</script>

<template>
    <div class="visitor">
        <Header
            case="one"
            leftIcon="chevron-back-outline"
            centerText="主页访客"
            rightText="设置"
            :rightClick="rightClick"
        ></Header>
        <div class="top">
            <div class="avatar">
                <img
                    src="@/assets/img/avatar.png"
                    alt="avatar"
                    width="105"
                    height="105"
                />
            </div>
            <div class="title">授权查看访客</div>
            <div class="message">
                <ul class="message-list">
                    <li>访客记录中仅展示同样已授权的用户</li>
                    <li>开启后，你访问他人主页也将留下记录</li>
                    <li>你可以随时在访客设置中关闭授权</li>
                </ul>
            </div>
        </div>
        <div class="opreate">
            <div class="box">
                <CommonButton
                    label="开启访客"
                    :click="openVisitor"
                ></CommonButton>
                <CommonButton
                    label="保持关闭"
                    :click="keepClose"
                    outline
                ></CommonButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.visitor {
    width: 100%;
    height: 100%;

    .top {
        width: 100%;
        height: 35%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        margin-bottom: 50px;

        .avatar {
            width: 105px;
            height: 105px;
            border-radius: 100%;

            img {
                border-radius: 100%;
            }
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            padding-block: 10px;
        }

        .message {
            .message-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                font-size: 14px;
                color: rgb(115, 115, 115);
            }
        }
    }

    .opreate {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 25px;
            width: 55%;
        }
    }
}
</style>
