<template>
  <div class="flex flex-row padding-border row">
    <div class="five columns">
      <Header text="Register">
        <div  class="flex flex-row">
          <div class="mr-32 mt-24">
            <img class="dark-grey-bg border-light" style="height:200px" :src="user.profilePicture"/>
            <label for="file" class="flex">
              <input id="file" type="file" name="files" @change="registerFile" accept="image/png, image/PNG, image/gif, image/jpeg, image/JPG, image/JPEG image/jpg, image/jpeg">
              <button class="button btn-primary grow"  onclick="document.getElementById('file').click();">Upload</button>
            </label>
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
        password: "",
        profilePicture: "http://localhost:4000/users/placeholder.png"
      },
      repeatedPassword: "",
      fileUploadTarget: "http://localhost:4000/image/uploads/profile"
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
          .then(res => {
            if(res.data.email) {
              this.errorMessage.email = "There is already an account associated with this email, please choose another email or login!"
            } else {
             this.errorMessage.email = null;
            }
          })
          .catch(error => {console.log(error)})
    },
    registerUser(){
      this.axios.post("http://localhost:4000/register/", this.user)
          .then(res => this.loginUser())
          .catch(error => {console.log(error)})
    },
    loginUser(){
      this.axios.post("http://localhost:4000/login/", {email: this.user.email, password: this.user.password})
          .then(res => {
            localStorage.setItem("accessToken", res.data.accessToken)
            this.$router.push('/me');
          })
          .catch(error => {console.log(error)})
    },
    registerFile: function(event) {
      this.files = event.target.files;
      this.send();
    },
    send: async function() {
      if (this.files != undefined || this.files != {}) {

        let formData = new FormData();

        for (const i of Object.keys(this.files)) {
          formData.append('files', this.files[i])
        }

        this.axios.post(this.fileUploadTarget, formData, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
            .then((res) => {
              if(res.data.code === 200) {
                this.user.profilePicture = res.data.file;
              }
            })
            .catch(error => {
              console.log(error);
            })
      }
    }
  },
  props: {},
  components: {Quote, Alert, Header},

}
</script>

<style scoped>

</style>
