import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Clients from "../views/Client/Clients";
import Client from "../views/Client/Client";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    beforeEnter(to, from, next) {
      if (store.state.isUserLoggedIn) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/client/:clientId",
    name: "client",
    component: Client,
    beforeEnter(to, from, next) {
      if (store.state.isUserLoggedIn) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
