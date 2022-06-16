<template>
  <header class="mb-64">
    <nav
      class="flex flex-row padding-border border-bottom pb-16 pt-16 flex-space-between-j"
    >
      <RouterLink to="/" class="logo-font dark-grey no-link">
        Memorybook
      </RouterLink>
      <RouterLink to="/" v-if="this.isUserAuthenticated">
        <div class="small-round"></div>
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
    };
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
                  if (res.data.code === 401) {
                    this.isUserAuthenticated = false;
                  } else {
                    this.isUserAuthenticated = true;
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

<style scoped></style>
