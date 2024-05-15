import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useKakao } from 'vue3-kakao-maps/@utils';

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import materialKit from "./material-kit";

useKakao('82a9864e3533339ac488097ce396cce9');
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
