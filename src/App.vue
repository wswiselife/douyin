<script setup lang="ts">
import { useRoute } from "vue-router";
import Footer from "./components/footer/Footer.vue";

const router = useRoute();
</script>

<template>
    <div class="app">
        <div class="container">
            <router-view></router-view>
        </div>
        <Footer v-show="router.meta.showFooter" class="footer"></Footer>
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
