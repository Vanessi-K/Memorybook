<script>
import { RouterLink, RouterView } from "vue-router";
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    RouterView, NavigationBar, Footer
  }
}
</script>

<template>
  <NavigationBar :key="$route.fullPath" />
  <RouterView style="min-height: 60vh;"/>
  <Footer :key="$route.fullPath" />
</template>

<style>
@import url("https://use.typekit.net/kbt4emu.css");
@import "@/assets/css/normalize.css";
@import "@/assets/css/skeleton.css";
@import "@/assets/css/flex.css";
@import "@/assets/css/fonts.css";
@import "@/assets/css/color.css";
@import "@/assets/css/border.css";
/*@import "@/assets/css/general.css";*/
@import "@/assets/css/margin.css";
@import "@/assets/css/padding.css";
@import "@/assets/css/input.css";
@import "@/assets/css/button.css";
</style>