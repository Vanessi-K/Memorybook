import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MeHomeView from "../views/MeHomeView.vue";
import ImpressumView from "../views/ImpressumView.vue";

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
  ],
});

router.beforeEach((to, from) => {
  //If not login or register are accessed
  if(to.name !== 'login' && to.name !== 'register' && to.name !== 'impressum' && to.name !== 'home') {
    return axios.post("http://localhost:4000/authenticate/", {accessToken: localStorage.getItem("accessToken")})
        //If the authentication-Token is not valid
        .then(message => {if(message.data.code !== 200) {return {name: "login"};}})
        .catch(error => {console.log(error); return {name: "login"};})
  }
})

export default router;
