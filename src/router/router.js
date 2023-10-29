import Home from "../pages/Home.vue";
import Service from "../pages/Service.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import Panel from "../pages/Panel.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuth } from "../services/auth";

const routes = [
  { path: "/", component: Home },
  { path: "/servicio", component: Service },
  { path: "/iniciar-sesion", component: Login },
  { path: "/registro", component: Register },
  { path: "/perfil", component: Profile, meta: { requiresAuth: true } },
  { path: "/panel", component: Panel, meta: { requiresAuth: true } },

  {
    path: "/usuario/:id",
    meta: { requiresAuth: true },
  },
  {
    path: "/usuario/:id/chat",
    component: PrivateChat,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

let user = {
  id: null,
  email: null,
};

subscribeToAuth((newUser) => (user = newUser));

router.beforeEach((to, from) => {
  if (user.id === null && to.meta.requiresAuth) {
    return {
      path: "/iniciar-sesion",
    };
  }
});

export default router;
