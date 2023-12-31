import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import vueAxios from "vue-axios";

const app = createApp(App);

app.use(router);
app.use(vueAxios, axios);

app.mount("#app");
