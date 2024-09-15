import { createApp } from "vue";

import clickOutside from "./common/directives/clickOutside";

import store from "./store/store";
import router from "./router";
import i18n from "./i18n";
import App from "./App.vue";
import "./style.css";

// Создание приложения
const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(i18n);
app.use(store);
app.use(router);

app.mount("#app");
