import { RouteRecordRaw, createWebHashHistory, createRouter } from "vue-router";

import HomeView from "../views/homeView/HomeView.vue";
import Me from "../views/me/Me.vue";
import Message from "../views/message/Message.vue";
import Shop from "../views/shop/Shop.vue";
import Public from "@/views/public/Public.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: "home",
        path: "/",
        component: HomeView,
        meta: { showFooter: true },
    },
    { name: "me", path: "/me", component: Me, meta: { showFooter: true } },
    {
        name: "message",
        path: "/message",
        component: Message,
        meta: { showFooter: true },
    },
    {
        name: "shop",
        path: "/shop",
        component: Shop,
        meta: { showFooter: true },
    },
    {
        name: "public",
        path: "/public",
        component: Public,
        meta: { showFooter: true },
    },
    // auth 处理
    {
        name: "login",
        path: "/login",
        component: () => import("../views/auth/Login.vue"),
    },
    {
        name: "register",
        path: "/register",
        component: () => import("../views/auth/Register.vue"),
    },

    // me 处理
    // 懒加载
    {
        path: "/me/for-update",
        component: () => import("../views/me/children/ForUpdate.vue"),
    },
    {
        path: "/me/visitor",
        component: () => import("../views/me/children/Visitor.vue"),
    },
    {
        path: "/me/edit-userinfo",
        component: () => import("../views/me/children/EditUserinfo.vue"),
    },
    {
        path: "/me/search",
        component: () => import("../views/me/children/Search.vue"),
    },
    {
        path: "/me/change-name",
        component: () => import("../views/me/children/ChangeName.vue"),
    },
    {
        path: "/me/change-douyinnum",
        component: () => import("../views/me/children/ChangeDouyinNum.vue"),
    },
    {
        path: "/me/change-desc",
        component: () => import("../views/me/children/ChangeDesc.vue"),
    },
    {
        path: "/me/change-location",
        component: () => import("../views/me/children/ChangeLocation.vue"),
    },
    {
        path: "/me/change-school",
        component: () => import("../views/me/children/ChangeSchool.vue"),
    },
    // public 处理
    {
        path: "/public/create-video",
        component: () => import("../views/public/CreateVideo.vue"),
    },
    {
        path: "/public/preview-video",
        component: () => import("../views/public/PreviewVideo.vue"),
    },
    {
        path: "/public/preview-image",
        component: () => import("../views/public/PreviewImage.vue"),
    },
    // public-20240611
    {
        path: "/public/preview-cover",
        component: () => import("../views/public/PreviewCover.vue"),
    },
    // message 处理
    {
        path: "/message/chat-with-friend",
        component: () => import("../views/message/children/ChatWithFriend.vue"),
    },
    // message-搜索-20240612
    {
        path: "/message/search",
        component: () => import("../views/message/children/Search.vue"),
    },
    // message-系统对话-20240612
    {
        path: "/message/system-chat",
        component: () => import("../views/message/children/SystemChat.vue"),
    },
    {
        path: "/me/my-video",
        component: () => import("../components/MyVideoDesc.vue"),
    },
    // 2024-06-11
    {
        path: "/me/friend-and-follow",
        component: () => import("@/views/me/children/FriendAndFollow.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
