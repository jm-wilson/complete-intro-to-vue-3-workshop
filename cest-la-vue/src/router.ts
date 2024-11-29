import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/dashboard/:user",
      component: () => import("@/views/DashboardPage.vue"),
    },
    {
      path: "/users",
      component: () => import("@/views/UsersPage.vue"),
      children: [
        {
          path: "",
          component: () => import("@/components/UsersGrid.vue"),
        },
        {
          path: ":id",
          component: () => import("@/components/UserProfile.vue"),
        },
      ],
    },
  ],
});
