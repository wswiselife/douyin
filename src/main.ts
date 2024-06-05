import { createApp } from "vue";
import "./style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import videoSlide from "video-slide";
import { createPinia } from "pinia";
import router from "./router/router";

const pinia = createPinia();

const app = createApp(App);

app.use(router).use(pinia).use(ElementPlus).use(videoSlide).mount("#app");
