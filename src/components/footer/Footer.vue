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
        <div class="nav-tab" @click="tab()">
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
                <span class="message">消息</span>
                <!-- <div class="badge">2</div> -->
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
    font-size: 1.6rem;
    font-weight: 700;
}

.footer {
    /* width 需要处理 */
    max-width: var(--app-width);
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1rem;
    height: var(--footer-height);
    background-color: var(--footer-background-color);
    color: var(--white);
    font-weight: 600;
    font-size: 1.4rem;
    /* position: fixed; */
    /* right: 0; */
    /* left: 0; */
    /* 遮挡问题 */
    /* bottom: 0; */
    /* top: calc(80vh - var(--footer-height)); */
}

.nav-tab {
    width: 25%;
    text-align: center;
}

.add-btn {
    font-size: 2.4rem;
    color: var(--white);
    border: 2px solid #fff;
    margin: 0 25%;
    border-radius: var(--rounded);
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 0.1rem 0rem;
}

.message {
    position: relative;
}

.badge {
    position: absolute;
    top: 0;
    right: -0.4rem;
    /* 相对布局问题 */
}
</style>
