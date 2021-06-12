import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Mypage from "../views/Mypage.vue";
import LoginThanks from "../views/LoginThanks.vue";
import ReservationThanks from "../views/ReservationThanks.vue";
import ReservationEdit from "../views/ReservationEdit.vue";
import Shop from "../views/Shop.vue";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
  },
  {
    path: "/loginthanks",
    name: "Loginthanks",
    component: LoginThanks,
  },
  {
    path: "/reservationthanks",
    name: "ReservationThanks",
    component: ReservationThanks,
  },
  {
    path: "/users/:id/reservation/:shopid",
    name: "ReservationEdit",
    component: ReservationEdit,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shops/:id",
    name: "Shop",
    component: Shop,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;