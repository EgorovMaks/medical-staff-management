import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NursesList from "@/views/NursesList.vue";
import DoctorsList from "@/views/DoctorsList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/nurses", // Перенаправление на маршрут "/nurses"
  },
  {
    path: "/nurses",
    name: "nurses",
    component: NursesList,
  },
  {
    path: "/doctors",
    name: "doctors",
    component: DoctorsList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
