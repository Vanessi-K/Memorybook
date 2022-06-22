<template>
  <div class="padding-border">
    <h4 class="mb-2">Hi!</h4>
    <h5>Let's take a trip down Memorylane!</h5>
    <Header class="mt-64" text="Favourites"  button-level="btn-secondary" button-value="Select Favourites">
      <img class="empty-placeholder" v-if="this.favouritesEmpty" src="http://localhost:4000/Placeholder_Favourites.png" alt="Select favourite Memorybooks">
      <div v-else class="flex-row flex gap wrap">
        <Polaroid v-for="memorybook in favouriteMemorybooks" :memory="memorybook"></Polaroid>
      </div>
    </Header>
    <Header class="mt-64" text="Memorys"  button-level="btn-primary" button-value="New Memory" @buttonAction="redirectCreate">
      <img class="empty-placeholder"  v-if="this.memorysEmpty" src="http://localhost:4000/Placeholder_New.png" alt="Create new Memorybooks">
      <div v-else class="flex-row flex gap wrap">
        <Polaroid v-for="memorybook in notFavouriteMemorybooks" :memory="memorybook"></Polaroid>
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
      user: {},
      favouriteMemorybooks: [],
      notFavouriteMemorybooks: [],
    }
  },
  computed: {
    favouritesEmpty() {
      return this.favouriteMemorybooks.length <= 0;
    },
    memorysEmpty() {
      return this.notFavouriteMemorybooks.length <= 0;
    }
  },
  methods: {
    redirectCreate() {
      this.$router.push('/me/create');
    }
  },
  props: {},
  mounted() {
    this.axios.get("http://localhost:4000/memorybook/favourite",{headers: {"accessToken":  localStorage.getItem("accessToken")}})
    .then(result => {

      console.log(result.data)
      if(result.data.code === 401) {
        this.$router.push("/login")
      }

      if(result.data.code === 200) {
        this.favouriteMemorybooks = result.data.memorybooks;
      }
    })
    .catch(error => {})

    this.axios.get("http://localhost:4000/memorybook/notFavourite",{headers: {"accessToken":  localStorage.getItem("accessToken")}})
        .then(result => {

          if(result.data.code === 401) {
            this.$router.push("/login")
          }

            if(result.data.code === 200) {
              this.notFavouriteMemorybooks = result.data.memorybooks;
            }

        })
        .catch(error => {})
  },
  components: {Polaroid, Header}

}
</script>

<style scoped>

.empty-placeholder {
  width: 100%;
  height: auto;
}

</style>