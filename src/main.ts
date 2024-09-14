import { createApp } from "vue";
import App from "./App.vue";

import clickOutside from "./directives/clickOutside";
import store from "./store/store";
import router from "./router";
import "./style.css";

// Создание приложения
const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(store);
app.use(router);

app.mount("#app");
