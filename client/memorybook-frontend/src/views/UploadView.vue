<template>
  <main class="padding-border">
    <input type="file" name="files" multiple @change="registerFiles">
    <button @click="send" class="btn-primary">Upload</button>
    <ImageDisplay :images="images"></ImageDisplay>
  </main>
</template>


<script>

import ImageDisplay from "../components/ImageDisplay.vue";
export default {
  name: "UploadView",
  data() {
    return {
      files: [],
      fileUploadTarget: "http://localhost:4000/image/temp/uploads/",
      images: []
    }
  },
  computed: {
  },
  methods: {
    registerFiles: function(event) {
      this.files = event.target.files;
    },
    send: async function() {
      if (this.files != undefined || this.files != {}) {

        let formData = new FormData();

        for (const i of Object.keys(this.files)) {
          formData.append('files', this.files[i])
        }

        this.axios.post(this.fileUploadTarget, formData, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then((res) => {
            console.log(res.data)
            if(res.data.code === 401) {
              this.$router.push('/login');
            }
            if(res.data.code === 200) {
              this.axios.get(this.fileUploadTarget, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
                  .then((res) => {
                    if(res.data.code === 401) {
                      this.$router.push('/login');
                    }

                    if(res.data.code === 200) {
                      this.images = res.data.files;
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  })
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
  mounted() {
    this.axios.get(this.fileUploadTarget, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
        .then((res) => {
          if(res.data.code === 401) {
            this.$router.push('/login');
          }

          if(res.data.code === 200) {
            this.images = res.data.files;
          }
        })
        .catch(error => {
          console.log(error);
        })
  },
  props: {
  },
  components: {ImageDisplay},

}

</script>

<style scoped>

</style>