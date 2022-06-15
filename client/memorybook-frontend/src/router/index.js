import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MeHomeView from "../views/MeHomeView.vue";
import ImpressumView from "../views/ImpressumView.vue";
import CreateView from "../views/CreateView.vue";
import EditView from "../views/EditView.vue";
import ViewView from "../views/ViewView.vue";
import UploadView from "../views/UploadView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/me",
      name: "me",
      component: MeHomeView,
    },
    {
      path: "/impressum",
      name: "impressum",
      component: ImpressumView,
    },
    {
      path: "/me/edit",
      name: "edit",
      component: EditView,
    },
    {
      path: "/me/create",
      name: "create",
      component: CreateView,
    },
    {
      path: "/me/view",
      name: "view",
      component: ViewView,
    },
    {
      path: "/me/edit/upload",
      name: "upload",
      component: UploadView,
    },
  ],
});

export default router;
