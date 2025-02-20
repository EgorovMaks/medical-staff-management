import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NursesPage from "@/views/NursesPage.vue";
import DoctorsPage from "@/views/DoctorsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/nurses",
  },
  {
    path: "/nurses",
    name: "nurses",
    component: NursesPage,
  },
  {
    path: "/doctors",
    name: "doctors",
    component: DoctorsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
