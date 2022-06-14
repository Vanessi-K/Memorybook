<script setup>
import { RouterLink, RouterView } from "vue-router";

function logout() {
  localStorage.clear();
}

</script>

<template>
  <header class="mb-64">
    <nav class="flex flex-row padding-border border-bottom pb-16 pt-16 flex-space-between-j">
        <RouterLink to="/" class="logo-font dark-grey no-link">Memorybook</RouterLink>
        <RouterLink to="/" ><div class="small-round"></div></RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer class="border-top padding-border mt-64">
    <div class="mt-32">
      <div class="flex flex-row flex-space-between-j flex-end-ac mb-32 pr-24 pl-24">
        <div class="flex flex-row ">
          <div class="mr-64">
            <p class="mb-16"><strong>Account</strong></p>
            <p class="mb-4"><RouterLink to="/" class="no-link">Settings</RouterLink></p>
            <p class="mb-4"><RouterLink to="/" @click="logout" class="no-link">Logout</RouterLink></p>
          </div>
          <div>
            <p class="mb-16"><strong>Memorybooks</strong></p>
            <p class="mb-4"><RouterLink to="/" class="no-link">Create New Memory</RouterLink></p>
            <p class="mb-4"><RouterLink to="/" class="no-link">Select Favourites</RouterLink></p>
          </div>
        </div>
        <p class="mb-4"><RouterLink to="/impressum" class="no-link">Impressum</RouterLink></p>
      </div>
      <p class="border-top pt-32 pb-64 text-center">by <strong>Vanessa Köck</strong></p>
    </div>
  </footer>
</template>

<style>
@import url("https://use.typekit.net/kbt4emu.css");
@import "@/assets/css/normalize.css";
@import "@/assets/css/skeleton.css";
@import "@/assets/css/flex.css";
@import "@/assets/css/fonts.css";
@import "@/assets/css/color.css";
@import "@/assets/css/border.css";
@import "@/assets/css/general.css";
@import "@/assets/css/margin.css";
@import "@/assets/css/padding.css";
@import "@/assets/css/input.css";
@import "@/assets/css/button.css";
</style>
