<template>
  <div class="flex flex-row padding-border row">
    <div class="five columns">
      <Header text="Register">
        <div  class="flex flex-row">
          <div class="mr-32 mt-24">
            <div class="dark-grey-bg" style="height:200px"></div>
            <button class="mt-16 mb-8 btn-secondary">Upload Profile Image</button>
          </div>
          <div class="grow">
            <div class="flex flex-column mb-16">
              <label>Username</label>
              <input type="text" v-model="user.username" name="username" placeholder="Your name"/>
            </div>
            <div class="flex flex-column mb-16">
              <label>Email</label>
              <input type="email" v-model="user.email" @blur="checkEmail" name="email" placeholder="your@email.com"/>
            </div>
            <div class="flex flex-column mb-8">
              <label>Password</label>
              <input type="password" v-model="user.password" @blur="checkPassword" name="password" placeholder="Password"/>
            </div>
            <div class="flex flex-column">
              <label>Repeat password</label>
              <input type="password" v-model="repeatedPassword" @blur="checkPassword" name="repeatedPassword" placeholder="Repeat password"/>
            </div>
          </div>
        </div>
        <Alert class="mt-16 mb-16" v-if="errorMessageState" :alert-texts="errorMessage"></Alert>
        <button class="btn-primary mb-24 mt-8" @click="registerUser" :disabled="isDisabled">Register</button>
      </Header>
    </div>
    <Quote class="seven columns" author="Joseph B. Wirthlin" quote-text="Some memories are unforgettable, remaining ever vivid and heartwarming!"></Quote>
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
        password: null,
        email: null
      },
      user: {
        username: "",
        email: "",
        password: ""
      },
      repeatedPassword: ""
    }
  },
  computed: {
    isDisabled() {
      //check if all fields are set and there is no error
      return !(!(this.errorMessageState) && (this.user.username !== "") && (this.user.email !== "") && (this.user.password !== "") && (this.repeatedPassword !== ""));
    },
    errorMessageState() {
      //check if there is any error message
      return !(!this.errorMessage.password && !this.errorMessage.email)
    }
  },
  methods: {
    checkPassword(){
      if(this.repeatedPassword !== this.user.password) {
        this.errorMessage.password = "Please make sure that you wrote the password the same both times!"
      } else {
        this.errorMessage.password = null;
      }
    },
    checkEmail(){
      this.axios.post("http://localhost:4000/user/email", {email: this.user.email})
          .then(message => {
            if(message.data.email) {
              this.errorMessage.email = "There is already an account associated with this email, please choose another email or login"
            } else {
             this.errorMessage.email = null;
            }
          })
          .catch(error => {console.log(error)})
    },
    registerUser(){
      this.axios.post("http://localhost:4000/register/", this.user)
          .then(message => this.loginUser())
          .catch(error => {console.log(error)})
    },
    loginUser(){
      this.axios.post("http://localhost:4000/login/", {email: this.user.email, password: this.user.password})
          .then(message => {

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
