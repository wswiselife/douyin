<script setup lang="ts">
import Footer from "./components/footer/Footer.vue";
</script>

<template>
    <div class="app">
        <router-view />
        <Footer></Footer>
    </div>
</template>

<style scoped>
.app {
    margin-bottom: 60px;
}
</style>
