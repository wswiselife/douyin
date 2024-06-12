<script setup lang="ts">
import BasicVideo from "@/components/BasicVideo.vue";
// import { storeToRefs } from "pinia";
import Comment from "../../components/Comment.vue";

import { usePiniaStore } from "@/store/store";
import { onMounted, reactive, ref } from "vue";
import videoApi from "@/api/video.api.ts";
import Utils from "@/utils/utils.ts";
const piniaStore = usePiniaStore();

// const pinia = storeToRefs(piniaStore);

// console.log("pinia.$state", pinia.showComment);

/**
 * 评论
 */
const commentHandle = () => {
    // console.log("click comment");
    piniaStore.changeCommentShow();

    // console.log("piniaStore", pinia.showComment);
    // pinia.showComment = !pinia.showComment;
    // console.log("piniaStore222", pinia.showComment);
};

onMounted(() => {
    // fetchVideoInfo();
});

// 喜欢收藏作品等数据的列表播放（特定视频id）
const videoIds = ref([1, 2, 3, 4, 5]); // 存放视频 ID 的数据

const videoInfo = reactive({
    url: "http://110.41.17.28:3000/uploads/videos/951bdd0332ddd6876cf724b0d9b7ae63",
    video_id: 1,
    followStatus: 0,
    like_count: 0,
    likeStatus: 0,
    comment_count: 0,
    collection_count: 0,
    collectionStatus: 0,
    share_count: "",
    suggest_words: "相关搜索内容",
    nickname: "seo",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCrfqaZ2H95Cs7Cu9S81mqKV_feGdQfMf1A&s",
    description: "今天也好香泥！#甜妹 #圆脸 #今天也长这样",
    videoAuthId: 1,
});

const handleVideoInfoUpdate = (data: any) => {
    // console.log("子组件传递过来的数据", data);

    // 减少id和视频url
    videoInfo.followStatus = data.followStatus;
    videoInfo.video_id = data.video_id;
    videoInfo.description = data.description;
    videoInfo.like_count = data.like_count;
    videoInfo.likeStatus = data.likeStatus;
    videoInfo.comment_count = data.comment_count;
    videoInfo.collection_count = data.collection_count;
    videoInfo.collectionStatus = data.collectionStatus;
    videoInfo.share_count = data.share_count;
    videoInfo.suggest_words = data.suggest_words;
    videoInfo.nickname = data.nickname;
    videoInfo.avatar = data.avatar;
    videoInfo.videoAuthId = data.videoAuthId;
};

// 权限处理
const hasPermission = () => {
    Utils.isLoged();

    // 控制登录之后操作
    if (!piniaStore.isLoged) {
        isShowTipContent.value = true;
        tipContent.value = "请先登录";
        setTimeout(() => {
            isShowTipContent.value = false;
        }, 2000);
        return false;
    }
    return true;
};

/**
 * 交互栏
 * @param message
 */
const interactionRightCol = (message: string) => {
    isShowTipContent.value = true;
    tipContent.value = message;
    setTimeout(() => {
        isShowTipContent.value = false;
    }, 2000);
};

// 关注
const followHandle = async () => {
    if (!hasPermission()) return;

    const response = await videoApi.createFollowApi(videoInfo.videoAuthId);
    console.log("response", response);
    if (response.code == 200) {
        videoInfo.followStatus = 1;
        interactionRightCol("关注成功");
    }
};

const tipContent = ref<string>();
const isShowTipContent = ref<boolean>(false);
// 点击喜欢-0602
// 方式1，根据状态，写个新接口处理喜欢或不喜欢
// 方式2，判断喜欢的状态，设置条件发送请求
// 20240602-待办，怎么将数据处理到本地的数据中，basevideo中的数据怎么得到的是新的数据
/**
 * 喜欢
 */
const likeHandler = async () => {
    // 如果起始为不喜欢，则调用喜欢的按钮，反之
    // 往上滑动之后，原来点击了喜欢的视频，样式又会回到没点赞的状态，但是实际上已经是点击了的，
    // 数据也改变了，但是由于数据是子组件传递过来的数据，所以这里有bug
    Utils.isLoged();

    // 控制登录之后操作
    if (!piniaStore.isLoged) {
        isShowTipContent.value = true;
        tipContent.value = "请先登录";
        setTimeout(() => {
            isShowTipContent.value = false;
        }, 2000);
        return;
    }

    if (videoInfo.likeStatus == 0) {
        const response = await videoApi.createVideoLikeApi(videoInfo.video_id);
        console.log("喜欢成功-response", response);
        if (response.code == 200) {
            // 将喜欢样式处理
            videoInfo.likeStatus = 1;
            // 喜欢数量-1
            videoInfo.like_count += 1;
        }
    } else {
        const response = await videoApi.createVideoDislikeApi(
            videoInfo.video_id
        );
        console.log("取消喜欢-response", response);
        if (response.code == 200) {
            videoInfo.likeStatus = 0;
            videoInfo.like_count -= 1;
        }
    }
};

/**
 * 收藏-20240607
 */
const collection = async () => {
    if (!hasPermission()) return;

    if (videoInfo.collectionStatus == 0) {
        const response = await videoApi.createCollectionApi(videoInfo.video_id);
        if (response.code == 200) {
            videoInfo.collectionStatus = 1;
            videoInfo.collection_count += 1;
            interactionRightCol("收藏成功");
        }
    } else {
        const response = await videoApi.createCancelCollectionApi(
            videoInfo.video_id
        );
        if (response.code == 200) {
            videoInfo.collectionStatus = 0;
            videoInfo.collection_count -= 1;
            interactionRightCol("取消收藏成功");
        }
    }
};
</script>

<template>
    <div class="home">
        <BasicVideo
            class="video"
            @update-video-info="handleVideoInfoUpdate"
            :videoIdList="videoIds"
        ></BasicVideo>
        <div class="box">
            <!-- 右侧交互栏 -->
            <div class="right-col">
                <div class="avatar">
                    <img :src="videoInfo.avatar" alt="avatar" />
                    <div class="concern" @click="followHandle">
                        <ion-icon
                            name="add-circle"
                            v-if="videoInfo.followStatus == 0"
                        ></ion-icon>
                    </div>
                </div>
                <div class="icon" @click="likeHandler">
                    <ion-icon
                        name="heart"
                        v-if="videoInfo.likeStatus == 0"
                    ></ion-icon>
                    <ion-icon
                        name="heart"
                        v-else="videoInfo.likeStatus == 1"
                        style="color: red"
                    ></ion-icon>

                    <div class="num">{{ videoInfo.like_count }}</div>
                </div>
                <div class="icon" @click="commentHandle">
                    <ion-icon name="chatbubble-ellipses"></ion-icon>
                    <div class="num">{{ videoInfo.comment_count }}</div>
                </div>
                <div class="icon" @click="collection">
                    <ion-icon
                        name="star"
                        v-if="videoInfo.collectionStatus == 0"
                    ></ion-icon>
                    <ion-icon
                        name="star"
                        v-if="videoInfo.collectionStatus == 1"
                        style="color: yellow"
                    ></ion-icon>
                    <div class="num">{{ videoInfo.collection_count }}</div>
                </div>
                <div class="icon">
                    <ion-icon name="arrow-redo"></ion-icon>
                    <div class="num">{{ videoInfo.share_count }}</div>
                </div>
                <div class="icon">
                    <ion-icon name="musical-notes"></ion-icon>
                </div>
            </div>

            <!-- 用户信息 -->
            <div
                class="message"
                :class="{ 'message-has-suggest': videoInfo.suggest_words }"
            >
                <div class="nickname">@{{ videoInfo.nickname }}</div>
                <div class="description">
                    {{ videoInfo.description }}
                </div>
            </div>

            <!-- 相关搜索 -->
            <div
                class="related"
                v-if="videoInfo.suggest_words"
                style="height: 28px"
            >
                <div class="title-box">
                    <ion-icon name="search-outline"></ion-icon>
                    <div class="title">{{ videoInfo.suggest_words }}</div>
                </div>
                <div class="enter-box">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>

            <!-- 进度条 -->
            <div class="progress"></div>
        </div>

        <!-- 评论 -->
        <Comment class="comment" :videoId="videoInfo.video_id"></Comment>

        <!-- 提示 -->
        <div v-if="isShowTipContent" class="tip-content">{{ tipContent }}</div>
    </div>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    // padding: 10px;
    background-color: #000000;

    .video {
        z-index: 1;
        position: absolute;
        top: 0;
        bottom: 58px;
        width: 100%;
    }

    .comment {
        position: absolute;
        // top: 10px;
        bottom: 58px;
        width: 100%;
        // height: 200px;
    }

    // tip
    .tip-content {
        z-index: 999;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        background-color: var(--tip-bg);
        padding: 5px 10px;
        border-radius: var(--rounded);
    }
}

.box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 58px;
    color: var(--white);

    .right-col {
        z-index: 16;
        position: fixed;
        bottom: calc(58px + 2px + 28px + 10px);
        // bottom: 0px;
        right: 0;
        width: auto;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
        margin-right: 10px;

        .avatar {
            position: relative;
            width: 55px;
            height: 55px;
            padding: 2px;
            background-color: #fff;
            border-radius: 100%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }

            .concern {
                position: absolute;
                left: 50%;
                bottom: -14px;
                transform: translateX(-50%);
                font-size: 20px;
                color: var(--primary-color);
            }
        }

        .icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 36px;

            .num {
                font-size: 14px;
            }
        }
    }

    .message {
        z-index: 16;
        position: fixed;
        bottom: 58px;
        left: 0;
        right: 0;
        height: auto;
        padding: 0 12px;
        padding-right: 80px;
        .nickname {
            font-size: 16px;
            font-weight: 600;
        }

        .description {
            padding-block: 10px;
        }
    }

    .message-has-suggest {
        bottom: calc(58px + 28px);
    }

    .related {
        z-index: 16;
        position: fixed;
        bottom: 58px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // height: 28px;
        padding-inline: 12px;
        font-size: 14px;
        background-color: rgba($color: #d0c8c8, $alpha: 0.5);

        .title-box {
            display: flex;
            align-items: center;
        }
    }

    .progress {
        position: fixed;
        bottom: 58px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #b80505;
    }
}
</style>
