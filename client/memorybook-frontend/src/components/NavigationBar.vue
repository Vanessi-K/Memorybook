<template>
  <header class="mb-64">
    <nav
      class="flex flex-row padding-border border-bottom pb-16 pt-16 flex-space-between-j"
    >
      <RouterLink to="/" class="logo-font dark-grey no-link">
        Memorybook
      </RouterLink>
      <RouterLink to="/" v-if="this.isUserAuthenticated">
        <div class="small-round" :style="{backgroundImage: cssImageString}"/>
      </RouterLink>
    </nav>
  </header>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
  name: "NavigationBar",
    components: {
      RouterLink
    },
  data() {
    return {
      accessToken: "",
      isUserAuthenticated: "",
      userImage: "",
    };
  },
  computed: {
    cssImageString() {
      return "url(" + this.userImage + ")";
    }
  },
    methods: {
      storageChanged() {
        this.accessToken = localStorage.getItem("accessToken");

          if (this.accessToken === null || this.accessToken === "") {
              this.isUserAuthenticated = false;
          }
          else {
            this.axios
                .get("http://localhost:4000/authenticate", {headers: {"accessToken": localStorage.getItem("accessToken")}})
                .then((res) => {
                  if (res.data.code !== 200) {
                    this.isUserAuthenticated = false;
                  } else {
                    this.isUserAuthenticated = true;
                    this.userImage = res.data.image;
                    console.log(this.userImage);
                  }
                });
          }
      }
    },
    mounted() {
        window.addEventListener("storage", this.storageChanged());
    },
    beforeRouteLeave() {
      window.removeEventListener("storage", this.storageChanged());
    }
};
</script>

<style scoped>
  .small-round {
    background-size:cover;
    box-sizing: border-box;
    background-position: center;
    border-radius: 24px;
    height: 48px;
    width: 48px;
    background-color: #202020;
  }

  .small-round:hover {
    border: 1px solid #202020;
  }



</style>
