<script setup lang="ts">
import router from "../../router/router";
import { watch, ref } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();

const currentTab = ref<string>();
watch(
    () => route.name,
    (name: any) => {
        currentTab.value = name;
    }
);

const tab = (num: number) => {
    switch (num) {
        case 1:
            router.push("/");
            break;
        case 2:
            router.push("/shop");
            break;
        case 3:
            router.push("/public");
            break;
        case 4:
            router.push("/message");
            break;
        case 5:
            router.push("/me");
            break;
    }
};
</script>

<template>
    <div class="footer">
        <div
            class="nav-tab"
            @click="tab(1)"
            :class="{ active: currentTab == 'home' }"
        >
            <span>首页</span>
        </div>
        <div
            class="nav-tab"
            @click="tab(2)"
            :class="{ active: currentTab == 'shop' }"
        >
            <span>商城</span>
        </div>
        <div class="nav-tab" @click="tab(3)">
            <div class="add-btn">
                <ion-icon name="add-outline"></ion-icon>
            </div>
        </div>
        <div
            class="nav-tab"
            @click="tab(4)"
            :class="{ active: currentTab == 'message' }"
        >
            <div>
                <span class="message"
                    >消息
                    <div class="badge">2</div></span
                >
            </div>
        </div>
        <div
            class="nav-tab"
            @click="tab(5)"
            :class="{ active: currentTab == 'me' }"
        >
            <span>我的</span>
        </div>
    </div>
</template>

<style scoped>
/* @import "../../style.css"; */

.active {
    /* font-size: 1.6rem; */
    font-weight: 700;
}

.footer {
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width 需要处理 */
    /* 2024-05-19 修复 */
    max-width: var(--app-max-width);
    width: 100%;
    height: 100%;
    height: var(--footer-height);
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--white);
    background-color: var(--footer-background-color);

    /* position: fixed; */
    /* right: 0; */
    /* left: 0; */
    /* 遮挡问题 */
    /* 遮挡问题只需要在app.vue中设置footer,无需获取手机底部导航的高度-20240519 */
    /* bottom: 0; */
    /* top: calc(80vh - var(--footer-height)); */
}

.nav-tab {
    width: 25%;
    text-align: center;
}

.add-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0 25%;
    padding: 0.1rem 0rem;
    font-size: 2.4rem;
    color: var(--white);
    border: 2px solid #fff;
    border-radius: var(--rounded);
}

.message {
    position: relative;
    display: inline-block;
}

.badge {
    position: absolute;
    top: -8px;
    right: -16px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 100%;
    background-color: var(--primary-color);
    /* 相对布局问题 */
    /* 相对布局要有一个父元素，才可以实现-20240519 */
}
</style>
