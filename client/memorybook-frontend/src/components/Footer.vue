<template>
    <footer class="border-top padding-border mt-64">
        <div class="mt-32">
            <div class="flex flex-row flex-space-between-j flex-end-ac mb-32 pr-24 pl-24">
                <div class="flex flex-row ">
                    <div class="mr-64">
                        <p class="mb-16"><strong>Account</strong></p>
                        <p class="mb-4" v-if="isUserAuthenticated"><RouterLink to="/" class="no-link">Settings</RouterLink></p>
                        <p class="mb-4" v-if="isUserAuthenticated"><RouterLink to="/" @click="logout" class="no-link">Logout</RouterLink></p>
                        <p class="mb-4" v-if="!isUserAuthenticated"><RouterLink to="/login" class="no-link">Login</RouterLink></p>
                    </div>
                    <div>
                        <p class="mb-16" v-if="isUserAuthenticated" ><strong>Memorybooks</strong></p>
                        <p class="mb-4" v-if="isUserAuthenticated" ><RouterLink to="/" class="no-link">Create New Memory</RouterLink></p>
                        <p class="mb-4" v-if="isUserAuthenticated"><RouterLink to="/" class="no-link">Select Favourites</RouterLink></p>
                    </div>
                </div>
                <p class="mb-4" style="align-self: flex-end;"><RouterLink to="/impressum" class="no-link">Impressum</RouterLink></p>
            </div>
            <p class="border-top pt-32 pb-64 text-center">by <strong>Vanessa Köck</strong></p>
        </div>
    </footer>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
    name: "Footer",
    data() {
        return {
            accessToken: "",
            isUserAuthenticated: "",
        }
    },
    components: {
        RouterLink
    },
    methods: {
        storageChanged() {
            this.accessToken = localStorage.getItem("accessToken");

            if (this.accessToken === null || this.accessToken === "") {
                this.isUserAuthenticated = false;
            } else {
              this.axios
                  .get("http://localhost:4000/authenticate", {headers: {"accessToken": localStorage.getItem("accessToken")}})
                  .then((res) => {
                    if (res.data.code === 401) {
                      this.isUserAuthenticated = false;
                    } else {
                      this.isUserAuthenticated = true;
                    }
                  })
              .catch(error => {console.log(error)})
              ;
            }
        },
        logout() {
            localStorage.clear();
        }
    },
    mounted() {
        window.addEventListener("storage", this.storageChanged());
    },
    beforeRouteLeave() {
        window.removeEventListener("storage", this.storageChanged());
    }
}
</script>

<style scoped>

</style>