<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default {
    name: "VideoList",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            page: 1,
            isPaused: false, // 控制暂停图标的显示
            swiperOption: {
                on: {
                    // 自动播放
                    slideChange: swiper => {
                        this.handleSlideChange(swiper);
                    },
                    // tap方法 是swiper组件提供的点击方法
                    tap: () => {
                        this.playAction(this.page - 1);
                    },
                    // 上滑（屏幕向上滑时，跳到下一个视频）
                    slideNextTransitionStart: () => {
                        this.page += 1;
                        this.nextVideo(this.page - 1);
                        console.log(this.page);
                    },
                    // 下滑（屏幕向下滑时）
                    slidePrevTransitionEnd: () => {
                        if (this.page > 1) {
                            this.page -= 1;
                            this.prevVideo(this.page - 1);
                            console.log(this.page);
                        }
                    },
                },
            },
        };
    },
    methods: {
        playAction(index) {
            // 入参 是 当前屏幕显示的是第几个视频
            // this.$refs.videos[index].playOrStop();
            // Stop all videos
            this.$refs.videos.forEach((video, idx) => {
                if (idx !== index) {
                    video.pause();
                    video.currentTime = 0;
                }
            });

            // Play the selected video
            this.$refs.videos[index].play();
        },
        // 向下
        nextVideo(index) {
            // this.$refs.videos[index - 1].stop();
            // this.$refs.videos[index].play();
            if (index > 0) {
                this.$refs.videos[index - 1].pause(); // Pause the previous video
                this.$refs.videos[index - 1].currentTime = 0; // Rewind the previous video
            }
            this.$refs.videos[index].play(); // Play the current video
        },
        // 向上
        prevVideo(index) {
            // this.$refs.videos[index + 1].stop();
            // this.$refs.videos[index].play();
            if (index < this.dataList.length - 1) {
                this.$refs.videos[index + 1].pause(); // Pause the next video
                this.$refs.videos[index + 1].currentTime = 0; // Rewind the next video
            }
            this.$refs.videos[index].play(); // Play the current video
        },
        // zhezhao
        toggleVideo(index, dataList) {
            // 上个视频停止
            if (index > 0) {
                const prev = this.$refs.videos[index - 1];
                if (!prev.paused) {
                    prev.pause();
                }
            }
            // 回到上个视频
            // Stop the next video if it exists and is not the last video
            // Stop the next video if it exists and is not the last video
            if (index < dataList.length - 1) {
                const next = this.$refs.videos[index + 1];
                if (!next.paused) {
                    next.pause();
                }
            }
            // 当前视频
            const video = this.$refs.videos[index];
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }

            // 根据当前视频的播放状态更新 isPaused
            this.isPaused = video.paused;
        },

        handleSlideChange(swiper) {
            const activeIndex = swiper.activeIndex;
            console.log(`当前屏幕上的视频为: ${activeIndex + 1}`);

            const videos = this.$refs.videos;
            for (let i = 0; i < videos.length; i++) {
                if (i === activeIndex) {
                    // 当前屏幕上的视频，重头开始播放
                    videos[i].currentTime = 0;
                    videos[i].play();
                } else {
                    // 不在当前屏幕上的视频，暂停并重置时间
                    videos[i].pause();
                    videos[i].currentTime = 0;
                }
            }

            // 在处理视频播放状态时，传递活动索引
            this.handleVideoPause(activeIndex);
        },

        handleVideoPlay(index) {
            console.log(`视频 ${index + 1} 正在播放`);
            // 可以在这里执行其他操作
            this.isPaused = false; // 视频播放时隐藏暂停图标
        },
        handleVideoPause(index) {
            console.log(`视频 ${index + 1} 已暂停`);
            // 可以在这里执行其他操作
            // 只有当当前视频是活动视频（即当前页面显示的视频）时，才显示暂停图标
            // 上划会出现暂停键
            if (index == -1) {
                this.isPaused = true; // 视频暂停时显示暂停图标
            }
            // this.isPaused = true; // 视频暂停时显示暂停图标
        },
    },
    setup() {},
};
</script>

<script setup>
import { ref } from "vue";

const dataList = [
    {
        id: "1",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-23%2012.00.00_%23%E5%B4%A9%E5%9D%8F%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E5%B8%AE%E5%B8%AE%E6%88%91%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%88%B7%E7%88%B7___%E7%82%B8%E9%B8%A1_%E6%89%A7%E8%A1%8C__KI%E4%B8%8A%E6%A0%A1%E7%AB%9F%E7%84%B6%E4%B9%9F%E6%9C%89%E9%9A%90%E8%97%8F%E7%9A%84%E5%8A%9B%E9%87%8F___KI%E4%B8%8A%E6%A0%A1%E6%88%90%E5%8A%9F%E5%8F%91%E5%8A%A8%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%BB%88%E7%BB%93%E6%8A%80_%E7%8E%B0%E5%9C%BA%E8%B6%85%E9%9C%87%E6%92%BC%E8%A7%86%E9%A2%91%E4%BC%A0%E5%9B%9E_%E4%B8%80%E8%B5%B7%E6%9D%A5%E7%9C%8B%E7%9C%8B%E5%B8%95__video-transcode..mp4",
    },
    {
        id: "2",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
    {
        id: "1",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-23%2012.00.00_%23%E5%B4%A9%E5%9D%8F%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E5%B8%AE%E5%B8%AE%E6%88%91%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%88%B7%E7%88%B7___%E7%82%B8%E9%B8%A1_%E6%89%A7%E8%A1%8C__KI%E4%B8%8A%E6%A0%A1%E7%AB%9F%E7%84%B6%E4%B9%9F%E6%9C%89%E9%9A%90%E8%97%8F%E7%9A%84%E5%8A%9B%E9%87%8F___KI%E4%B8%8A%E6%A0%A1%E6%88%90%E5%8A%9F%E5%8F%91%E5%8A%A8%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%BB%88%E7%BB%93%E6%8A%80_%E7%8E%B0%E5%9C%BA%E8%B6%85%E9%9C%87%E6%92%BC%E8%A7%86%E9%A2%91%E4%BC%A0%E5%9B%9E_%E4%B8%80%E8%B5%B7%E6%9D%A5%E7%9C%8B%E7%9C%8B%E5%B8%95__video-transcode..mp4",
    },
    {
        id: "3",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
    {
        id: "4",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
    {
        id: "1",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-23%2012.00.00_%23%E5%B4%A9%E5%9D%8F%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E6%98%9F%E7%A9%B9%E9%93%81%E9%81%93__%23%E5%B8%AE%E5%B8%AE%E6%88%91%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%88%B7%E7%88%B7___%E7%82%B8%E9%B8%A1_%E6%89%A7%E8%A1%8C__KI%E4%B8%8A%E6%A0%A1%E7%AB%9F%E7%84%B6%E4%B9%9F%E6%9C%89%E9%9A%90%E8%97%8F%E7%9A%84%E5%8A%9B%E9%87%8F___KI%E4%B8%8A%E6%A0%A1%E6%88%90%E5%8A%9F%E5%8F%91%E5%8A%A8%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%BB%88%E7%BB%93%E6%8A%80_%E7%8E%B0%E5%9C%BA%E8%B6%85%E9%9C%87%E6%92%BC%E8%A7%86%E9%A2%91%E4%BC%A0%E5%9B%9E_%E4%B8%80%E8%B5%B7%E6%9D%A5%E7%9C%8B%E7%9C%8B%E5%B8%95__video-transcode..mp4",
    },
    {
        id: "5",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
    {
        id: "6",
        url: "http://s32p8v831.hd-bkt.clouddn.com/2023-09-21%2021.00.08_%23%E8%82%AF%E5%BE%B7%E5%9F%BA%E7%87%83%E6%83%85%E4%BA%9A%E8%BF%90%E5%AD%A3_%E5%92%8C%E5%8F%AF%E7%88%B1%E7%9A%84%E5%90%89%E7%A5%A5%E7%89%A9_%E5%B0%8F%E6%9C%8B%E5%8F%8B%E4%BB%AC%E4%B8%80%E8%B5%B7%E8%B7%B3%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E6%93%8D_%E4%B8%BA%E4%BA%9A%E8%BF%90%E5%8A%A0%E6%B2%B9%E5%8A%A9%E5%A8%81__video-transcode..mp4",
    },
];
</script>
<template>
    <div class="swiper-wrapper">
        <swiper
            class="swiper-box"
            :direction="'vertical'"
            :grabCursor="true"
            :mousewheel="true"
            :mousewheelControl="true"
            :resistanceRatio="0"
            :observeParents="true"
            :options="swiperOption"
            @slideChange="handleSlideChange"
        >
            <!-- 幻灯片内容 -->
            <swiper-slide
                class="slide-box"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <div>
                    <div class="overlay" @click="toggleVideo(index, dataList)">
                        <ion-icon
                            name="caret-forward-outline"
                            class="icon"
                            v-show="isPaused"
                        ></ion-icon>
                    </div>
                    <video
                        class="video-box"
                        ref="videos"
                        :videoList="item"
                        :src="item.url"
                        :index="index"
                        @play="handleVideoPlay(index)"
                        @pause="handleVideoPause(index)"
                        loop
                    ></video>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped lang="scss">
.swiper-wrapper {
    /* width: 100vw ;  */
    height: calc(100vh - 100px);
    .swiper-box {
        width: 100%;
        .slide-box {
            position: relative;
            .overlay {
                z-index: 15;
                position: absolute;
                width: 100%;
                top: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                // opacity: 0.5;

                .icon {
                    font-size: 76px;
                    opacity: 0.5;
                }
            }
            .video-box {
                width: 100%;
                height: calc(100vh - 100px);
            }
            .video-box-right {
                position: absolute;
                right: 0;
                bottom: 30vh;
                top: 30vh;
                /* z-index: 80; */
            }
            .infobar_warp {
                position: absolute;
                bottom: 55px;
                left: 0;
            }
        }
    }
}
</style>
