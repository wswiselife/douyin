<script setup lang="ts">
// import Swiper core and required modules
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
    Mousewheel,
} from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const modules = [Autoplay, Mousewheel];

// Navigation--左右按钮
// Scrollbar--滚动条显示
// 底部小点--Pagination
// Autoplay--自动播放

const onSwiper = swiper => {
    console.log(swiper);
};

const onSlideChange = () => {
    console.log("slide change");
};
</script>

<template>
    <div class="message">
        <div class="box">
            <!-- navigation-左右按钮 -->
            <!-- :autoplay="{ delay: 2000, disableOnInteraction: false }"--自动播放 -->
            <!--  -->
            <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="50"
                :pagination="{ clickable: true }"
                :direction="'vertical'"
                mousewheel
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                class="s"
            >
                <swiper-slide class="slide">Slide 1</swiper-slide>
                <swiper-slide class="slide">Slide 2</swiper-slide>
                <swiper-slide class="slide">Slide 3</swiper-slide>
                <swiper-slide class="slide">Slide 4</swiper-slide>
                <swiper-slide class="slide">Slide 5</swiper-slide>
                <swiper-slide class="slide">Slide 6</swiper-slide>
                <swiper-slide class="slide">Slide 7</swiper-slide>
                ...
            </swiper>
        </div>
    </div>
</template>

<style scoped>
.s {
    height: 200px;
    width: 200px;
}
.slide {
    width: 200px;
    height: 100%;
    background-color: #57dc7d;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-items: 100px;
}

.message {
    width: 100%;
    background-color: #dbdbdb;
}

.box {
    width: 100%;
    height: calc(100vh - 58px);
}
</style>
