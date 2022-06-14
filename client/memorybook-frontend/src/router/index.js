import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MeHomeView from "../views/MeHomeView.vue";

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
  ],
});

router.beforeEach((to, from) => {
  if(to.name !== 'login' && to.name !== 'register') {
    console.log(to.name);
    axios.post("http://localhost:4000/authenticate/", {accessToken: localStorage.getItem("accessToken")})
        .then(message => {
          console.log(message.data.code);
          if(message.data.code === 200) {
          } else {
            console.log("here");
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          return false;
        })
  }
})

export default router;
