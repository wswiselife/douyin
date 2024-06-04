<script setup lang="ts">
import { useRouter } from "vue-router";
import UserApi from "../../api/user";
import { onMounted, watch, ref, reactive } from "vue";
import { usePiniaStore } from "@/store/store";

import UpdateBackground from "./UpdateBackground.vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const pinia = usePiniaStore();

onMounted(() => {
    getUserinfo();
});

watch(
    () => pinia.showComment,
    newVal => {
        console.log("new", newVal);
    },
    { deep: true }
);

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
    console.log("response", response);
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
};

const showUpdateBackgroundDialog = ref<boolean>(false);
const openDialog = () => {
    showUpdateBackgroundDialog.value = true;
};
// const singleBackgroundUrl = ref<string>("");
const updateBackground = async (message: string) => {
    // 应该是选择图片，这里先用弹出框处理
    showUpdateBackgroundDialog.value = true;
    const data = {
        cover_url: message,
    };
    const response = await UserApi.updateUserInfoApi(null, data);
    console.log("update response", response);
    if (response.data.code === 200) {
        ElMessage({
            type: "success",
            message: "修改成功！",
        });
        // 重新获取
        getUserinfo();
    }
};

const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
};

const toggle = () => {
    pinia.isShowMeSeting();
};
</script>

<template>
    <div class="me">
        <!-- 背景 -->
        <div class="background">
            <div class="background-header">
                <!-- <img :src="myInfo.cover_url" alt="" /> -->
                <div class="header">
                    <span @click="openDialog">
                        <ion-icon
                            name="image-outline"
                            class="backgrond-icon"
                        ></ion-icon>
                    </span>

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
                                    登录
                                </div>
                                <div class="item" @click="logout">退出登录</div>
                                <div class="item">注册</div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <div class="background-introduction">
                <div class="introduction-box">
                    <div class="avatar">
                        <img :src="myInfo.avatar" alt="avatar" />
                    </div>
                    <div class="introduction">
                        <div class="name">{{ myInfo.nickname }}</div>
                        <div class="douyin-code">
                            <span>抖音号：</span>
                            <span>{{ myInfo.unique_id }}</span>
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
                    <div>
                        <span>{{ myInfo.favoriting_count }}</span>
                        <span>获赞</span>
                    </div>

                    <div>
                        <span>{{ myInfo.friends || 0 }}</span>
                        <span>朋友</span>
                    </div>
                    <div>
                        <span>{{ myInfo.follower_count }}</span>
                        <span>关注</span>
                    </div>
                    <div>
                        <span>{{ myInfo.following_count }}</span>
                        <span>粉丝</span>
                    </div>
                </div>
            </div>

            <!-- 介绍 -->
            <div class="description-box">
                <div class="description">
                    <div>{{ myInfo.signature }}</div>
                </div>
                <div class="description-other">
                    <div class="sex">{{ myInfo.gender }}</div>
                    <div class="address">
                        {{ myInfo.country }}-{{ myInfo.province }}-{{
                            myInfo.city
                        }}
                    </div>
                    <div class="university">{{ myInfo.school }}</div>
                </div>
            </div>

            <!-- 更多 -->
            <div class="more">
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="bag-handle-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>抖音商城</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon
                            name="musical-notes-outline"
                            class="icon"
                        ></ion-icon>
                    </div>
                    <div>我的音乐</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="people-outline" class="icon"></ion-icon>
                    </div>
                    <div>我的群聊</div>
                </div>
                <div class="more-item">
                    <!-- <img src="../../asset/icon/add-louline.svg" alt="" /> -->
                    <div class="icon-box">
                        <ion-icon name="grid-outline" class="icon"></ion-icon>
                    </div>

                    <div>查看更多</div>
                </div>
            </div>

            <!-- 资料编辑/添加好友 -->
            <div class="edit-box">
                <!-- 添加朋友 -->
                <div class="add-friends">添加朋友</div>
                <!-- 编辑资料 -->
                <div class="edit" @click="navigateTo('/me/edit-userinfo')">
                    编辑资料
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
                <div class="video-box"></div>

                <!-- 没有更多 -->
                <div class="bottom">暂时没有更多</div>
            </div>
        </div>

        <UpdateBackground
            v-model:showDialog="showUpdateBackgroundDialog"
            @new-background="updateBackground"
        ></UpdateBackground>
    </div>
</template>

<style scoped lang="scss">
.me {
    width: 100%;
    height: 100%;
}

.background {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 22rem;

    // 需要更换的url地址不能写在这里
    // background-image: url(../../assets/img/background.png);
    color: var(--white);
}

.background-header {
    position: relative;
    width: 100%;
    height: 100%;

    img {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 1rem 1.8rem;
    }
}

.backgrond-icon {
    font-size: 2.6rem;
}

.usermenu {
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 1.2rem;

    .setting {
        position: relative;
        .box {
            background-color: #887a7a;
            position: absolute;
            top: 40px;
            right: 0;
            width: 100px;
        }
    }
}

.usermenu-icon {
    font-size: 20px;
    background-color: #9f9f9f;
    padding: 0.5rem;
    border-radius: 100%;
}

.background-introduction {
    // flex: 1;
    position: absolute;
    top: 10rem;
    // display: flex;
    // align-items: center;
}

.introduction-box {
    z-index: 15;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
}

.avatar img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
}

.description-other {
    display: flex;
    gap: 1rem;
}

.content {
    flex: 1;
    // position: absolute;
    // top: 21rem;
    // width: 100%;
    border-radius: var(--rounded-md) var(--rounded-md) 0 0;
    background-color: var(--white);
    color: var(--black);
    padding: 1.6rem 1.2rem;
    font-size: 14px;
}

.information {
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.information-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
}

.description-box {
    padding-top: 1.2rem;
    color: #ccc;
    font-size: 1.2rem;
}

.more {
    padding-top: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

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

.edit-box {
    margin-top: 1.6rem;
    display: flex;
    gap: 1.2rem;
    text-align: center;
}

.add-friends {
    flex: 1;
    padding: 0.8rem 0;
    background-color: #ccc;
    border-radius: var(--rounded);
}

.edit {
    flex: 1;
    padding: 0.8rem 0;
    background-color: #ccc;
    border-radius: var(--rounded);
}

.video-content {
    padding-top: 1.6rem;
}

.video-classify {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0 1.6rem;
}

.bottom {
    margin: 1.5rem;
    border: var(--border-gray);
    padding: 1.5rem 2rem;
    text-align: center;
}
</style>
