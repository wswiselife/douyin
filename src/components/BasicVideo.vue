<script setup lang="ts">
import { ref } from "vue";
import Footer from "./footer/Footer.vue";

const videoNode = ref<HTMLVideoElement | null>(null);
// 视频的暂停与播放
function videoPlayOrPause() {
    if (videoNode.value) {
        videoNode.value.paused
            ? videoNode.value.play()
            : videoNode.value.pause();
    }
}

// 这里也卡住获取不到事件
// 视频总长度
const duration = ref<Number>();
const currentTime = ref<Number>();
function showProgress() {
    // 点击判断修改事件
    // 进度条
    // 当前时间
    currentTime.value = videoNode.value?.currentTime;
    // 总时间
    duration.value = videoNode.value?.duration;
    // console.log("duration.value", duration.value);
    showProgress.value = true;
}



const isPause = ref<Boolean>(false);
const mark = () => {
    // console.log("click mark");
    videoPlayOrPause();
    // console.log("e", e.returnValue);
    // console.log("videoNode.value", videoNode.value);
    // console.log("videoNode.paused", videoNode.value.paused);

    // console.log("currentTime", currentTime.value);

    // 暂停键
    if (videoNode.value.paused) {
        // console.log("videoNode.paused", videoNode.value.paused);
        // 如果暂停了就显示暂停按钮
        isPause.value = true;
        // 调用进度条显示
        // onProgress();
    } else {
        isPause.value = false;
        // 隐藏进度条
        // offProgress();
    }
};
</script>

<template>
    <div class="video-wrapper">
        <!--  -->

        <!-- video -->
        <video
            ref="videoNode"
            src="@/assets/video/我是香秀.mp4"
            loop
            class="video"
            preload="true"
        >
            <p>您的浏览器不支持 video 标签。</p>
        </video>

        <!-- mark -->
        <div class="mark" @click="mark">
            <ion-icon
                name="caret-forward-outline"
                class="pause"
                v-if="isPause"
            ></ion-icon>
        </div>

        <!-- progress -->
        <!-- <div class="progress">
            <input
                type="range"
                min="0"
                max="100"
                ref="progressRef"
                class="progress"
            /> -->
        <!-- </div> -->
        <!-- <div class="footer"> -->
        <!-- <Footer></Footer> -->
        <!-- </div> -->
    </div>
</template>

<style scoped lang="scss">
.video-wrapper {
    font-size: 1.4rem;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.video {
    width: 100%;
    height: calc(100vh - 58px);
    max-width: 420px;
}

.mark {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 58px;
    // background-color: #555;
    // opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;

    .pause {
        width: 85px;
        height: 85px;
        opacity: 0.4;
    }
}

.playProgress {
    color: green;
}

.puaseProgress {
    color: red;
}

// .progress {
//     -webkit-appearance: none; /* 隐藏默认的样式 */
//     width: 100%; /* 设置宽度 */
//     height: 2px; /* 设置高度 */
//     border-radius: 1px; /* 设置圆角 */
//     background: #02cdaf; /* 设置背景 */
//     outline: none; /* 去掉外边框 */
//     opacity: 0.7; /* 设置透明度 */
//     -webkit-transition: 0.2s; /* 添加过渡效果 */
//     transition: opacity 0.2s;
// }

// .progress::-webkit-slider-thumb {
//     -webkit-appearance: none; /* 隐藏默认的样式 */
//     appearance: none;
//     width: 4px; /* 设置滑块的宽度 */
//     height: 4px; /* 设置滑块的高度 */
//     border-radius: 50%; /* 设置滑块的圆角 */
//     background: #ec042e; /* 设置滑块的背景 */
//     cursor: pointer; /* 添加手形光标 */
// }

// .progress::-moz-range-thumb {
//     -webkit-appearance: none; /* 隐藏默认的样式 */
//     width: 100%; /* 设置宽度 */
//     height: 2px; /* 设置高度 */
//     border-radius: 1px; /* 设置圆角 */
//     background: #02cdaf; /* 设置背景 */
//     outline: none; /* 去掉外边框 */
//     opacity: 0.7; /* 设置透明度 */
//     -webkit-transition: 0.2s; /* 添加过渡效果 */
//     transition: opacity 0.2s;
// }

[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
}
[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    background: #08df89;
}
[type="range" i]::-webkit-slider-container {
    height: 4px;
    overflow: hidden;
}
[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f44336;
    border: 1px solid transparent;
    margin-top: -8px;
    border-image: linear-gradient(#f44336, #f44336) 0 fill / 8 20 8 0 / 0px 0px
        0 2000px;
}
</style>
