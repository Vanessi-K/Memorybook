<template>
  <div class="flex flex-row padding-border row">
    <div class="five columns">
      <Header text="Login" order="h2">
          <div class="grow">
            <div class="flex flex-column mb-16">
              <label>Email</label>
              <input type="email" v-model="user.email" name="email" placeholder="your@email.com"/>
            </div>
            <div class="flex flex-column">
              <label>Password</label>
              <input type="password" v-model="user.password" @blur="checkPassword" name="password" placeholder="Password"/>
            </div>
          </div>
        <Alert class="mt-24" v-if="errorMessage" :alert-text="errorMessage"></Alert>
        <button class="btn-primary mb-24 mt-24 mr-24">Login</button>
        <button class="mb-24 mt-24 btn-secondary">Register</button>
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
      errorMessage: null,
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
      return !((this.errorMessage === null) && (this.user.username !== "") && (this.user.email !== "") && (this.user.password !== "") && (this.repeatedPassword !== ""));
    }
  },
  methods: {
    checkPassword(){
      if(this.repeatedPassword !== this.user.password) {
        this.errorMessage = "Please make sure that you wrote the password the same both times!"
      } else {
        this.errorMessage = null;
      }
    },
    registerUser(){
      this.axios.post("http://localhost:4000/register/", this.user)
          .then(message => console.log(message.data))
          .catch(error => {console.log(error)})
      alert("you registered")
    }
  },
  props: {},
  components: {Quote, Alert, Header},

}
</script>

<style scoped>

</style>