<template>
  <div class="flex flex-row padding-border row">
    <div class="five columns">
      <Header text="Login" order="h2">
          <div class="grow">
            <div class="flex flex-column mb-16">
              <label>Email</label>
              <input type="email" v-model="user.email" @blur="checkEmail" name="email" placeholder="your@email.com"/>
            </div>
            <div class="flex flex-column">
              <label>Password</label>
              <input type="password" v-model="user.password"  name="password" placeholder="Password"/>
            </div>
          </div>
        <Alert class="mt-24" v-if="errorMessageState" :alert-texts="errorMessage"></Alert>
        <button class="btn-primary mt-24 mr-24" @click="loginUser">Login</button>
        <router-link to="/register"><button class="mb-24 btn-secondary">Register</button></router-link>
      </Header>
    </div>
    <Quote class="seven columns" author="Radhika Apte" quote-text="My memories mean a lot to me, and I hold them close to my heart."></Quote>
  </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import Quote from "../components/Quote.vue";
import Header from "../components/Header.vue";

export default {
  name: "RegisterView",
  data() {
    return {
      errorMessage: {
        email: null,
        password: null
      },
      user: {
        email: "",
        password: ""
      }
    }
  },
  computed: {
    isDisabled() {
      //check if all fields are set and there is no error
      return !(!(this.errorMessageState)&& (this.user.username !== "") && (this.user.email !== "") && (this.user.password !== "") && (this.repeatedPassword !== ""));
    },
    errorMessageState() {
      //check if there is any error message
      return !(!this.errorMessage.password && !this.errorMessage.email)
    }
  },
  methods: {
    checkEmail(){
      this.axios.post("http://localhost:4000/user/email", {email: this.user.email})
          .then(message => {
            if(!message.data.email) {
              this.errorMessage.email = "There is no account associated with this email, please choose another email or register!"
            } else {
              this.errorMessage.email = null;
            }
          })
          .catch(error => {console.log(error)})
    },
    loginUser(){
      this.axios.post("http://localhost:4000/login/", {email: this.user.email, password: this.user.password})
          .then(message => {
            console.log({email: this.user.email, password: this.user.password})
            console.log(message.data);
            if(!message.data.accessToken) {
              this.errorMessage.password = "The password is incorrect!";
            } else {
              localStorage.setItem("accessToken", message.data.accessToken)
              this.errorMessage.password = null;
              this.$router.push('/me');
            }
          })
          .catch(error => {console.log(error)})
    }
  },
  props: {},
  components: {Quote, Alert, Header},

}
</script>

<style scoped>

</style>