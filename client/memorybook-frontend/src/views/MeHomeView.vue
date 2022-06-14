<template>
  <div class="padding-border">
    <h4 class="mb-2">Hi {{user.username}}...</h4>
    <h5>Let's take a trip down Memorylane!</h5>
    <Header class="mt-64" text="Favourites"  button-level="btn-secondary" button-value="Select Favorites">
      <p v-if="favoritesEmpty">Select favourites</p>
      <div v-else class="flex-row flex gap wrap">
        <Polaroid :is-favourite="true"></Polaroid>
        <Polaroid :is-favourite="true"></Polaroid>
        <Polaroid :is-favourite="true"></Polaroid>
        <Polaroid :is-favourite="true"></Polaroid>
      </div>
    </Header>
    <Header class="mt-64" text="Memorys"  button-level="btn-primary" button-value="New Memory">
      <p v-if="memorysEmpty">No memories</p>
      <div v-else class="flex-row flex gap wrap">
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
        <Polaroid></Polaroid>
      </div>

    </Header>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Polaroid from "../components/Polaroid.vue";

export default {
  name: "MeHomeView",
  data() {
    return {
      user: {}
    }
  },
  computed: {
    favoritesEmpty() {
      return true;
    },
    memorysEmpty() {
      return true;
    }
  },
  methods: {
  },
  props: {},
  components: {Polaroid, Header}

}
</script>

<style scoped>

</style>