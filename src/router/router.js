import Vue from "vue";
import Router from "vue-router";

import App from "./App";
import Home from "./views/HomeLayout";
import Login from "./views/LoginLayout";
import Register from "./views/RegisterLayout";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = new Router({
  routes,
});