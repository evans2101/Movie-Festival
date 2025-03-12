import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import MovieDetail from "@/pages/MovieDetail.vue";
import AdminDashboard from "@/pages/Admin.vue";
import LoginPage from "@/components/Login.vue";
import RegisterPage from "@/components/Register.vue";
import AdminStats from "@/pages/AdminStats.vue";


const routes = [
  { path: "/", component: HomePage },
  { path: "/movie/:id", component: MovieDetail },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/admin/stats", component: AdminStats, meta: { requiresAuth: true, requiresAdmin: true } },
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// **Route Guard untuk proteksi halaman admin**
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else if (to.meta.requiresAdmin && user?.role !== "admin") {
    next("/");
  } else {
    next();
  }
});

export default router;
