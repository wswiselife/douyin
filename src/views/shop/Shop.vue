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
            swiperOption: {
                on: {
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
            this.$refs.videos[index].playOrStop();
        },
        // 向下
        nextVideo(index) {
            this.$refs.videos[index - 1].stop();
            this.$refs.videos[index].play();
        },
        // 向上
        prevVideo(index) {
            this.$refs.videos[index + 1].stop();
            this.$refs.videos[index].play();
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
        >
            <!-- 幻灯片内容 -->
            <swiper-slide
                class="slide-box"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <div>
                    <video
                        class="video-box"
                        controls
                        ref="videos"
                        :videoList="item"
                        :src="item.url"
                        :index="index"
                    ></video>
                </div>
                <div class="infobar_warp"><InfoBar :info-data="item" /></div>
                <div class="video-box-right">
                    <LikeComponent :like-data="item"></LikeComponent>
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
