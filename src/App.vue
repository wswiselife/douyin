<script setup lang="ts">
import { useRoute } from "vue-router";
import Footer from "./components/footer/Footer.vue";
import { onMounted, ref, watch } from "vue";
import CenterSheet from "./components/CenterSheet.vue";

const router = useRoute();
const route = useRoute();

const showTip = ref<boolean>(false);

const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

onMounted(() => {
    showTipFun();
    if (isMobileDevice()) {
        cancelTip();
    }
});

const showTipFun = () => {
    showTip.value = true;
};

const cancelTip = () => {
    showTip.value = false;
};

// 为什么时router呢
watch(
    () => route.path,
    () => {
        // console.log("kkk", isMobileDevice());
        if (isMobileDevice()) {
            cancelTip();
        }
    }
);
</script>

<template>
    <div class="app">
        <div class="container">
            <router-view></router-view>
        </div>
        <Footer v-show="router.meta.showFooter" class="footer"></Footer>

        <CenterSheet
            class="slot"
            :showPopup="showTip"
            @update:showPopup="val => (showTip = val)"
        >
            <template #content>
                <div class="content">
                    <div class="box">
                        <div class="tip">
                            <div class="box">
                                <ion-icon name="warning-outline"></ion-icon>
                            </div>
                            <div class="close-box" @click="cancelTip">
                                <ion-icon
                                    name="close-circle-outline"
                                ></ion-icon>
                            </div>
                        </div>
                        <h2>切换至手机模式获取最佳体验</h2>
                        <p>1.按F12调出控制台</p>
                        <p>2.按Ctrl+Shift+M，或点击下面图标</p>
                    </div>
                    <div class="img">
                        <img src="@/assets/img/tip/guide.png" alt="" />
                    </div>
                </div>
            </template>
        </CenterSheet>
    </div>
</template>

<style scoped>
.app {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 这里组件的宽高才是后续组件宽高的基础 */
    width: 100vw;
    height: 100vh;
    max-width: 480px;
    background-color: #ffffff;

    .slot {
        .content {
            width: 380px;
            padding: 0;
            margin: 0;
            background-color: rgb(21, 23, 36);

            .box {
                padding: 12px;
                .tip {
                    position: relative;

                    .box {
                        position: relative;
                        width: 100%;
                        text-align: center;
                        padding: 12px;

                        ion-icon {
                            color: red;
                            font-size: 42px;
                        }
                    }

                    .close-box {
                        position: absolute;
                        top: 0;
                        right: 0;
                        color: white;
                        font-size: 24px;
                        padding: 5px;
                    }
                }

                h2 {
                    font-size: 24px;
                    color: white;
                    font-weight: 600;
                    padding-top: 15px;
                    padding-bottom: 10px;
                }
                p {
                    font-size: 16px;
                    color: white;
                    font-weight: 600;
                    padding: 5px;
                }
            }
            .img {
                width: 100%;

                img {
                    width: 100%;
                }
            }
        }
    }
}

.container {
    flex: 1;
    width: 100%;
    height: 100%;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
