import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home/Home.vue";
import Auth from "@/views/Auth/Auth.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
