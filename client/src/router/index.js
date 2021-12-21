import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Clients from "../views/Client/Clients";
import Client from "../views/Client/Client";
import ClientInfo from "../components/ClientInfo";
import ClientCases from "../components/ClientCases";
import createClient from "../views/Client/CreateClient";
import editClient from "../views/Client/EditClient";
import Cases from "../views/Case/Cases";
import Case from "../views/Case/Case";
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
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
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
    path: "/client/create",
    name: "createClient",
    component: createClient,
    beforeEnter(to, from, next) {
      if (store.state.isUserLoggedIn) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/client/:clientId/edit",
    name: "editClient",
    component: editClient,
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
    children: [
      {
        path: "",
        component: ClientInfo,
      },
      {
        path: "cases",
        component: ClientCases,
      },
    ],
    beforeEnter(to, from, next) {
      if (store.state.isUserLoggedIn) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/cases",
    name: "Cases",
    component: Cases,
    beforeEnter(to, from, next) {
      if (store.state.isUserLoggedIn) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/case/:caseId",
    name: "case",
    component: Case,
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
