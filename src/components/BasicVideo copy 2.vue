<script setup lang="ts">
import { ref } from "vue";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";

const modules = [Mousewheel, Navigation];

const onSwiper = swiper => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log("slide change");
};

const refList = ref([]);
const videoNode = (el, index) => {
    console.log("el,index", el, index);
    if (el) {
        refList.value[index] = el;
    } else {
        // Remove reference when the element is unmounted
        refList.value[index] = null;
    }
};
// const videoNode = ref<HTMLVideoElement | null>(null);
const getVideoNode = el => {
    console.log("el", el);
    videoNode.value = el;
    console.log("refList.value", videoNode.value);
};

// console.log("videoNode", videoNode.value);
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
    console.log('videoRef',videoRef);
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

const videos = [
    "../assets/video/喜多.mp4",
    "../assets/video/我是香秀.mp4",
    "../assets/video/qianqianlong.mp4",
];

const dataList = [
    {
        id: "2",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
    {
        id: "1",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-23%2012.00.00_%23%E5%B4%A9%E5%9D%8F%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E5%B8%AE%E5%B8%AE%E6%88%91%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%88%B7%E7%88%B7___%E7%82%B8%E9%B8%A1_%E6%89%A7%E8%A1%8C__KI%E4%B8%8A%E6%A0%A1%E7%AB%9F%E7%84%B6%E4%B9%9F%E6%9C%89%E9%9A%90%E8%97%8F%E7%9A%84%E5%8A%9B%E9%87%8F___KI%E4%B8%8A%E6%A0%A1%E6%88%90%E5%8A%9F%E5%8F%91%E5%8A%A8%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%BB%88%E7%BB%93%E6%8A%80_%E7%8E%B0%E5%9C%BA%E8%B6%85%E9%9C%87%E6%92%BC%E8%A7%86%E9%A2%91%E4%BC%A0%E5%9B%9E_%E4%B8%80%E8%B5%B7%E6%9D%A5%E7%9C%8B%E7%9C%8B%E5%B8%95__video-transcode..mp4",
    },
];

const handleScroll = e => {
    // console.log("e-target", e);

    const { scrollTop, clientHeight } = e.target;

    const index = Math.round(scrollTop / clientHeight);

    videoNode.value.forEach((video, i) => {
        if (i == index) {
            video.play();
        } else {
            video.pause();
        }
    });
};

const videoRef = ref()
// 得到ref
const playAction = (index){
    videoRef.value[index].playOrStop()
}
const nextVideo = (index){
    videoRef.value[index-1].stop()
    videoRef.value[index].play()
}
const prevVideo = (index){
    videoRef.value[index+1].stop()
    videoRef.value[index].play()
}
</script>

<template>
    <div class="video-wrapper" @scroll="handleScroll">
        <!-- 处理视频滚动框-20240527 -->

        <swiper
            class="swiper"
            :direction="'vertical'"
            :modules="modules"
            :mousewheel="true"
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide
                class="slide"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <video
                    class="video-box"
                    controls
                    ref="videoRef"
                    :videoList="item"
                    :src="item.url"
                    :index="index"
                ></video>
                <!-- <video
                    :ref="el => videoNode(el, index)"
                    :src="item.url"
                    loop
                    autoplay
                    class="video"
                    preload="true"
                >
                    <p>您的浏览器不支持 video 标签。</p>
                </video> -->
                <!-- slide1 -->
            </swiper-slide>
        </swiper>

        <!-- video待总结-0527 -->
        <!-- <video
            ref="videoNode"
            v-for="(videoSrc, index) in videos"
            :key="index"
            :src="videoSrc"
            loop
            class="video"
            preload="true"
        >
            <p>您的浏览器不支持 video 标签。</p>
        </video> -->

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
    height: calc(100% - 58px);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .swiper {
        // z-index: 15;
        width: 100%;
        height: 100vh;

        .slide {
            background-color: #694c64;
            width: 100%;
            height: 100vh;

            .video {
                width: 100%;
                height: 100%;
            }
        }
    }

    .mark {
        z-index: 15;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        .pause {
            width: 85px;
            height: 85px;
            opacity: 0.4;
        }
    }

    // gpt
    // overflow-y: scroll;
    // scroll-snap-type: y mandatory;
}

// .video {
//     width: 100%;
//     height: calc(100vh - 58px);

//     // // gpt
//     // scroll-snap-align: start;
//     // object-fit: cover;
// }

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

.playProgress {
    color: green;
}

.puaseProgress {
    color: red;
}
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
