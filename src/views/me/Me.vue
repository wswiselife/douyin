<script setup lang="ts">
import { useRouter } from "vue-router";
import UserApi from "../../api/user";
import { onMounted, watch, ref, reactive, computed } from "vue";
import { usePiniaStore } from "@/store/store";
import VideoList from "@/components/VideoList.vue";
import videoApi from "@/api/video.api";
import CenterSheet from "@/components/CenterSheet.vue";
// import UpdateBackground from "./UpdateBackground.vue";
// import { ElMessage } from "element-plus";

const router = useRouter();
const pinia = usePiniaStore();

onMounted(() => {
    checkLogin(); // 检查是否登录
    getUserinfo(); // 获取我的信息
    getMyVideoHandler(); // 获取我的作品
    if (!myInfo.unique_id) {
        nowTime.value = Date.now();
    }
    if (!myInfo.nickname) {
        randomName.value = "可爱的访客";
    }
});

const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("login");
        return;
    }
};

watch(
    () => pinia.showComment,
    newVal => {
        console.log("new", newVal);
    },
    { deep: true }
);

const isShowTip = ref<boolean>(false);
const showTipContent = ref<string>();

const showTipFun = (tip: string) => {
    isShowTip.value = true;
    showTipContent.value = tip;
    setTimeout(() => {
        isShowTip.value = false;
    }, 1500);
};

const setting = () => {
    showTipFun("暂未实现");
};

const todo = () => {
    showTipFun("暂未实现");
};

const navigateTo = (url: string) => {
    router.push(url);
};

// interface myInfoI {
//     cover_url: string;
//     nickname: string;
// }

const myInfo = reactive({
    cover_url: "",
    nickname: "",
    unique_id: "",
    signature: "",
    school: "",
    province: "",
    gender: "",
    country: "",
    city: "",
    avatar: "",
    birthday: "",
    aweme_count: "", //作品数
    favoriting_count: "", //获赞数
    follower_count: "", // 关注数
    following_count: "", // 粉丝数
    friends: "", // 朋友数
});
const getUserinfo = async () => {
    const response = await UserApi.getUserInfoApi();
    // console.log("response", response);
    // 持久化处理todo
    if (response.code === 200) {
        let data = response.data[0];
        // console.log("myInfo", myInfo);
        // for (let mes in data) {
        //     console.log(mes);
        //     myInfo.mes;
        // }
        // 待解决-2024-05-19
        myInfo.cover_url = data.cover_url;
        myInfo.nickname = data.nickname;
        myInfo.avatar = data.avatar;
        myInfo.birthday = data.birthday;
        myInfo.city = data.city;
        myInfo.country = data.country;
        myInfo.province = data.province;
        myInfo.gender = data.gender;
        myInfo.school = data.school;
        myInfo.signature = data.signature;
        myInfo.unique_id = data.unique_id;
        myInfo.aweme_count = data.aweme_count;
        myInfo.favoriting_count = data.favoriting_count;
        myInfo.follower_count = data.follower_count;
        myInfo.following_count = data.following_count;
        myInfo.friends = data.friends;
    }

    // console.log("myInfo.value", myInfo);
    // 将信息存起来
    pinia.setMyInfo(myInfo);
};

// 原先处理更换背景
// const showUpdateBackgroundDialog = ref<boolean>(false);
// const openDialog = () => {
//     showUpdateBackgroundDialog.value = true;
// };
// const singleBackgroundUrl = ref<string>("");
// const updateBackground = async (message: string) => {
//     // 应该是选择图片，这里先用弹出框处理
//     showUpdateBackgroundDialog.value = true;
//     const data = {
//         cover_url: message,
//     };
//     const response = await UserApi.updateUserInfoApi(null, data);
//     console.log("update response", response);
//     if (response.data.code === 200) {
//         ElMessage({
//             type: "success",
//             message: "修改成功！",
//         });
//         // 重新获取
//         getUserinfo();
//     }
// };

const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
        router.push("/");
    }, 1000);
};

const toggle = () => {
    pinia.isShowMeSeting();
};

// 2024-06-09
// const getGender = computed(() => {
//     if (myInfo.gender == "1") {
//         return "男";
//     } else if (myInfo.gender == "2") {
//         return "女";
//     } else {
//         return ""; // Handle other cases as needed
//     }
// });

const getAge = computed(() => {
    if (myInfo.birthday) {
        const today = new Date();
        const birthDate = new Date(myInfo.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    } else {
        return ""; // Handle case when birthday is not available
    }
});

/**
 * 抖音号处理，应该后端处理的-2024-06-09
 */

const nowTime = ref<number>();
const randomName = ref<string>();
// 2024-06-10
const videoList = ref([]); //视频列表
const VideoIdList = ref([]); // 视频的id列表，用于处理喜欢的视频播放获取视频

const getMyVideoHandler = async () => {
    const response = await videoApi.getMyVideoApi();
    // console.log("response", response);

    // 转换数据格式
    const videos = response.data.map(video => ({
        id: video.id,
        url: video.cover,
        count: video.like_count,
    }));

    videoList.value = videos;

    let videoIdList = [];
    videos.forEach(item => {
        videoIdList.push(item.id);
    });

    VideoIdList.value = videoIdList;
    // console.log("VideoIdList", VideoIdList.value);
    pinia.setMyVideoIdList(VideoIdList.value);
};

const showMyLikePopup = ref<boolean>(false);
// 显示我的获赞数-20240611
const showMyVideoLike = () => {
    console.log("click");
    // pinia.setShowMyVideoLike();
    showMyLikePopup.value = true;
};

// 2024-06-11
</script>

<template>
    <div class="me">
        <!-- 背景 -->
        <div class="background">
            <!-- 背景图 -->
            <div class="bg-box">
                <img
                    src="https://s2.loli.net/2024/06/08/HxEmRF5hT2d3tMy.jpg"
                    alt="cover"
                    v-if="!myInfo.cover_url"
                />
                <img :src="myInfo.cover_url" alt="cover" />
            </div>
            <!-- 头顶 -->
            <div class="background-header">
                <!-- 更换背景图 -->
                <div class="header">
                    <!-- <span @click="openDialog">
                        <ion-icon
                            name="image-outline"
                            class="backgrond-icon"
                        ></ion-icon>
                    </span> -->

                    <div class="edit" @click="navigateTo('/me/edit-userinfo')">
                        <ion-icon name="pencil"></ion-icon>编辑资料
                    </div>

                    <div class="usermenu">
                        <!-- 求更新 -->
                        <span>
                            <!-- <img src="../../assets/icon/finger-right.png" alt="" /> -->
                            <ion-icon
                                @click="navigateTo('/me/for-update')"
                                name="paper-plane-outline"
                                class="usermenu-icon"
                            ></ion-icon>
                        </span>

                        <!-- 主页访客 -->
                        <span>
                            <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                            <ion-icon
                                @click="navigateTo('/me/visitor')"
                                name="people-outline"
                                class="usermenu-icon"
                            ></ion-icon>
                        </span>

                        <!-- 搜索 -->
                        <span>
                            <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                            <ion-icon
                                @click="navigateTo('/me/search')"
                                name="search-outline"
                                class="usermenu-icon"
                            ></ion-icon>
                        </span>

                        <!-- 设置 -->
                        <span class="setting" @click="toggle">
                            <!-- <img src="../../assets/icon/menu.png" alt="" /> -->
                            <ion-icon
                                name="reorder-three-outline"
                                class="usermenu-icon"
                            ></ion-icon>

                            <!-- 登录/注册 -->
                            <div class="box" v-if="pinia.showMeSetting">
                                <div class="item" @click="navigateTo('/login')">
                                    切换账号
                                </div>
                                <div class="item" @click="logout">退出登录</div>

                                <div class="item" @click="setting">设置</div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <!-- 头像 -->
            <div class="background-introduction">
                <div class="introduction-box">
                    <div class="avatar">
                        <img
                            src="https://s2.loli.net/2024/06/08/AkwLEavo15T2crQ.png"
                            alt="avatar"
                            v-if="!myInfo.avatar"
                        />
                        <img
                            :src="myInfo.avatar"
                            alt="avatar"
                            v-if="myInfo.avatar"
                        />
                    </div>
                    <div class="introduction">
                        <div class="name">
                            <div v-if="myInfo.nickname">
                                {{ myInfo.nickname }}
                            </div>
                            <div v-else>{{ randomName }}</div>
                        </div>
                        <div class="douyin-code">
                            <span>抖音号：</span>
                            <span v-if="myInfo.unique_id">{{
                                myInfo.unique_id
                            }}</span>
                            <span v-else>dy{{ nowTime }}</span>
                            <span class="qr-code">
                                <ion-icon name="qr-code-outline"></ion-icon>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主体 -->
        <div class="content">
            <!-- 互动 -->
            <div class="information">
                <div class="information-box">
                    <div class="info" @click="showMyVideoLike">
                        <span>{{ myInfo.favoriting_count || 0 }}</span>
                        <span>获赞</span>
                    </div>

                    <div
                        class="info"
                        @click="navigateTo('/me/friend-and-follow')"
                    >
                        <span>{{ myInfo.friends || 0 }}</span>
                        <span>朋友</span>
                    </div>
                    <div
                        class="info"
                        @click="navigateTo('/me/friend-and-follow')"
                    >
                        <span>{{ myInfo.follower_count || 0 }}</span>
                        <span>关注</span>
                    </div>
                    <div
                        class="info"
                        @click="navigateTo('/me/friend-and-follow')"
                    >
                        <span>{{ myInfo.following_count || 0 }}</span>
                        <span>粉丝</span>
                    </div>
                </div>

                <div class="add-friends" @click="todo">添加朋友</div>
            </div>

            <!-- 介绍 -->
            <div class="description-box">
                <div class="description">
                    <div class="no-desc" v-if="!myInfo.signature">
                        <div
                            class="title"
                            @click="navigateTo('/me/edit-userinfo')"
                        >
                            点击添加介绍，让大家认识你...
                        </div>
                        <div class="icon-box">
                            <ion-icon name="pencil"></ion-icon>
                        </div>
                    </div>
                    <div>{{ myInfo.signature }}</div>
                </div>
                <div class="description-other">
                    <!-- 性别+年龄 -->
                    <div
                        class="sex item"
                        v-if="myInfo.gender || myInfo.birthday"
                    >
                        <div v-if="myInfo.gender">
                            <img
                                v-if="myInfo.gender == '1'"
                                src="@/assets/icon/man.png"
                                alt="Male Icon"
                            />
                            <img
                                v-else-if="myInfo.gender == '2'"
                                src="@/assets/icon/woman.png"
                                alt="Female Icon"
                            />
                        </div>

                        <div v-if="myInfo.birthday">{{ getAge }}岁</div>
                    </div>
                    <!-- 地区 -->
                    <div
                        class="address item"
                        v-if="myInfo.province || myInfo.city"
                    >
                        {{ myInfo.province }}{{ myInfo.city }}
                    </div>
                    <!-- 学校 -->
                    <div class="university item" v-if="myInfo.school">
                        {{ myInfo.school }}
                    </div>
                    <div
                        class="no-desc-other item"
                        v-if="!myInfo.school || !myInfo.province"
                    >
                        <div class="icon-box">
                            <ion-icon name="add"></ion-icon>
                        </div>
                        <div class="add-label">添加所在地，学校等标签</div>
                    </div>
                </div>
            </div>

            <!-- 更多 -->
            <div class="more">
                <div class="more-item" @click="todo">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="bag-handle-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>抖音商城</div>
                </div>
                <div class="more-item" @click="todo">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="musical-notes-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>我的音乐</div>
                </div>
                <div class="more-item" @click="todo">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="people-outline" class="icon"></ion-icon>
                    </div>
                    <div>我的群聊</div>
                </div>
                <div class="more-item" @click="todo">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="grid-outline" class="icon"></ion-icon>
                    </div>

                    <div>查看更多</div>
                </div>
            </div>

            <!-- 视频 -->
            <div class="video-content">
                <!-- 分类 -->
                <div class="video-classify">
                    <div>作品{{ myInfo.aweme_count }}</div>
                    <div>私密</div>
                    <div>喜欢</div>
                    <div>收藏</div>
                </div>
                <!-- 视频 -->
                <div class="video-box" v-if="videoList.length !== 0">
                    <VideoList :videoList="videoList"></VideoList>

                    <div class="nomore">暂时没有更多了</div>
                </div>

                <!-- 没有作品 -->
                <div
                    class="bottom"
                    @click="navigateTo('/public')"
                    v-if="videoList.length == 0"
                >
                    <div class="left">
                        <div class="icon-box">
                            <ion-icon
                                name="camera-outline"
                                class="icon"
                            ></ion-icon>
                        </div>
                        <div class="content">
                            <div class="title">发作品，留下记忆</div>
                            <div class="subtitle">开始在抖音记录生活</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="btn">去发布</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑头像 -->
        <!-- <UpdateBackground
            v-model:showDialog="showUpdateBackgroundDialog"
            @new-background="updateBackground"
        ></UpdateBackground> -->

        <!-- 小提示 -->
        <div class="tip-content" v-if="isShowTip">
            {{ showTipContent }}
        </div>

        <!-- popup弹出框 -->

        <CenterSheet
            class="center-sheet"
            :showPopup="showMyLikePopup"
            @update:showPopup="val => (showMyLikePopup = val)"
        >
            <template #content>
                <div class="content">
                    <div class="img">
                        <img
                            src="../../assets/img/background.png"
                            alt="cover"
                        />
                    </div>
                    <div class="title">
                        {{ myInfo.nickname }}共获得{{
                            myInfo.favoriting_count
                        }}个赞
                    </div>
                    <div class="btn" @click="showMyLikePopup = false">确定</div>
                </div>
            </template>
        </CenterSheet>
    </div>
</template>

<style scoped lang="scss">
.me {
    position: relative;
    width: 100%;
    height: 100%;
    // overflow-y: hidden;

    .background {
        z-index: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 25rem;

        // 需要更换的url地址不能写在这里
        // background-image: url(../../assets/img/background.png);
        // color: var(--white);

        .bg-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 120%;
            z-index: -1;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }

        .background-header {
            position: relative;
            width: 100%;
            height: 100%;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.8rem;
            }

            .edit {
                background-color: rgba($color: #9f9f9f, $alpha: 0.6);

                padding: 5px 15px;
                color: white;
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
            }

            .usermenu {
                display: flex;
                justify-content: center;
                align-content: center;
                gap: 1.2rem;

                .setting {
                    position: relative;
                    .box {
                        background-color: rgba($color: #887a7a, $alpha: 0.6);
                        position: absolute;
                        top: 40px;
                        right: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                        width: 100px;
                        padding: 12px 0;
                        color: white;
                        border-radius: var(--rounded);

                        .item {
                            width: 100%;
                            padding: 0 10px;
                        }
                    }
                }
            }

            .usermenu-icon {
                font-size: 20px;
                color: white;
                background-color: rgba($color: #9f9f9f, $alpha: 0.6);
                // background-color: #9f9f9f;
                padding: 0.5rem;
                border-radius: 100%;
            }
        }

        .background-introduction {
            // flex: 1;
            position: absolute;
            top: 10rem;
            color: white;
            // display: flex;
            // align-items: center;

            .introduction-box {
                z-index: 20;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 2rem;
                padding-inline: 2rem;

                .avatar img {
                    width: 10rem;
                    height: 10rem;
                    border-radius: 100%;
                }

                .introduction {
                    .name {
                        padding-block: 8px;
                        font-size: 20px;
                    }

                    .douyin-code {
                        font-size: 14px;
                    }

                    .qr-code {
                        padding-left: 10px;
                    }
                }
            }
        }
    }

    .content {
        z-index: 2;
        flex: 1;
        // position: absolute;
        // top: 21rem;
        // width: 100%;
        position: relative;
        margin-top: -1rem;
        padding-top: 1rem;
        border-radius: var(--rounded) var(--rounded) 0 0;
        border-radius: 20px;
        background-color: var(--white);
        color: var(--black);
        padding: 1.6rem 0;
        font-size: 14px;

        // 交互信息
        .information {
            display: flex;
            justify-content: space-between;
            align-content: center;
            padding: 0 1.2rem;

            .information-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 2.2rem;

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }

            .add-friends {
                padding: 0.8rem 3rem;
                background-color: #ccc;
                border-radius: var(--rounded);
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        // 描述
        .description-box {
            padding-top: 1rem;
            color: #ccc;
            font-size: 1.2rem;
            padding-inline: 1.2rem;
            .description {
                // width: 80%;
                .no-desc {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    font-size: 14px;
                    padding-block: 4px;
                }
            }

            .description-other {
                // width: 80%;
                display: flex;
                align-items: center;
                gap: 8px;
                padding-top: 10px;

                .sex {
                    display: flex;
                    align-items: center;
                    gap: 5px;

                    img {
                        width: 14px;
                        height: 14px;
                    }
                }

                .item {
                    padding: 3px 4px;
                    border-radius: 3px;
                    background-color: #ccc;
                    color: black;
                }

                .no-desc-other {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .icon-box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }

        // 其他连接
        .more {
            padding-top: 0.8rem;
            padding-inline: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .more-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
            }

            .icon-box {
                text-align: center;
            }

            .icon {
                font-size: 2.6rem;
            }
        }

        // 作品集
        .video-content {
            padding: 1.6rem 0;
            width: 100%;

            .video-classify {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 2px solid black;
                font-size: 16px;
                padding-bottom: 10px;
                padding-inline: 2.2rem;
                margin-bottom: 5px;
            }
            .video-box {
                overflow-y: scroll;

                .nomore {
                    margin-bottom: 200px;
                    text-align: center;
                }
            }

            .bottom {
                margin: 1.5rem;
                border: var(--border-gray);
                padding: 1.5rem;
                margin-bottom: 80px;
                border-radius: var(--rounded);
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;

                    .icon-box {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .icon {
                            font-size: 24px;
                            background-color: #f9f9f9;
                            border-radius: 100%;
                            padding: 5px;
                        }
                    }
                    .content {
                        .title {
                            font-size: 14px;
                            color: black;
                            font-weight: 600;
                            letter-spacing: 1.5px;
                        }

                        .subtitle {
                            font-size: 12px;
                            padding-top: 6px;
                            color: #ccc;
                        }
                    }
                }

                .right {
                    background: rgba($color: #ff758f, $alpha: 0.1);
                    border-radius: var(--rounded);
                    .btn {
                        padding: 5px 15px;
                        color: var(--primary-color);
                        font-weight: 600;
                        font-size: 14px;
                        letter-spacing: 1.5px;
                    }
                }
            }
        }
    }

    .tip-content {
        z-index: 999;
        position: absolute;
        top: 50%;
        left: 50%;

        font-size: 12px;
        transform: translate(-50%, -50%);
        color: white;
        background-color: var(--tip-bg);
        padding: 5px 10px;
        border-radius: var(--rounded);
    }

    // 共获赞数量
    .center-sheet {
        .content {
            padding: 0;
            margin: 0;
            width: 300px;
            .img {
                width: 100%;
                height: auto;
                margin-bottom: 20px;

                img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    // border-radius: 10px;
                }
            }

            .title {
                font-size: 1.2em;
                font-weight: bold;
                text-align: center;
                padding-bottom: 16px;
            }

            .btn {
                width: 100%;

                padding: 10px;
                text-align: center;
                border-top: 1px solid #ccc;
            }
        }
    }
}
</style>
