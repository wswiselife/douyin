import { createApp } from "vue";
import "./style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import videoSlide from "video-slide";
import { createPinia } from "pinia";
import router from "./router/router";
import Vant from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";

const pinia = createPinia();

const app = createApp(App);

app.use(router)
    .use(pinia)
    .use(Vant)
    .use(ElementPlus)
    .use(videoSlide)
    .mount("#app");
