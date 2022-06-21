<template>
  <main class="padding-border">
    <Back :back-text="this.backText" :back-path="this.backPath"></Back>

    <div class="pt-24 pb-24 mb-24 flex flex-column flex-center-ac flex-center-j border-dashed">
      <h3 class="mb-16">Upload</h3>
      <p class="mb-16">Select files to upload</p>
      <label class="button btn-primary fileupload-button">
        Upload
       <input type="file" name="files" multiple @change="registerFiles"  accept="image/png, image/PNG, image/gif, image/jpeg, image/JPG, image/JPEG image/jpg, image/jpeg">
      </label>
      <p class="small-text mt-4">Support for .jpg-images and .png-images</p>
    </div>

    <ImageDisplayEdit @reloadAction="loadImages" :images="images"></ImageDisplayEdit>
  </main>
</template>


<script>

import ImageDisplayEdit from "../components/ImageDisplayEdit.vue";
import Back from "../components/Back.vue";
export default {
  name: "UploadView",
  data() {
    return {
      files: [],
      images: []
    }
  },
  computed: {
    fileUploadTarget() {
      return "http://localhost:4000/image/uploads/" + this.elementId;
    }
  },
  methods: {
    registerFiles: function(event) {
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
              this.axios.get("http://localhost:4000/memorybook/" + this.elementId + "/images", {headers: {"accessToken":  localStorage.getItem("accessToken")}})
                  .then((res) => {
                    if(res.data.code === 401) {
                      this.$router.push('/login');
                    }

                    if(res.data.code === 200) {
                      this.images = res.data.images;
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
    },
    loadImages() {
      this.axios.get("http://localhost:4000/memorybook/" + this.elementId + "/images", {headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then((res) => {
            if(res.data.code === 401) {
              this.$router.push('/login');
            }

            if(res.data.code === 200) {
              this.images = res.data.images;
            }
          })
          .catch(error => {
            console.log(error);
          })
    }
  },
  mounted() {
    this.loadImages();
  },
  props: {
    elementId: String,
    backText: String,
    backPath: String
  },
  components: {ImageDisplayEdit, Back},

}

</script>

<style scoped>

.border-dashed {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='50%2c50' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}

.border-dashed > *{
  align-self: center;
}


</style>