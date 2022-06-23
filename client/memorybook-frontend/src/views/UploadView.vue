<template>
  <main class="padding-border">
    <Back :back-text="backTextStorage" :back-path="backPathStorage"></Back>

    <div
        class="pt-24 pb-24 mb-24 flex flex-column flex-center-ac flex-center-j border-dashed"
    >
      <h3 class="mb-16">Upload</h3>
      <p class="mb-16">Select files to upload</p>
      <label>
        <input
            id="file"
            type="file"
            name="files"
            @change="registerFiles"
            accept="image/png, image/PNG, image/gif, image/jpeg, image/JPG, image/JPEG image/jpg, image/jpeg"
            multiple
        />
        <button
            class="button btn-primary grow"
            onclick="document.getElementById('file').click();"
        >
          Upload
        </button>
      </label>
      <p class="small-text mt-4">Support for .jpg-images and .png-images</p>
    </div>

    <ImageDisplayEdit
        @reloadAction="loadImages"
        :images="images"
    ></ImageDisplayEdit>
  </main>
</template>

<script>
import ImageDisplayEdit from "../components/ImageDisplayEdit.vue";
import Back from "../components/Back.vue";
import router from "../router";

export default {
  name: "UploadView",
  data() {
    return {
      files: [],
      images: [],
    };
  },
  computed: {
    backPathStorage() {
      return this.backPath || localStorage.getItem("backPath");
    },
    backTextStorage() {
      return this.backText || localStorage.getItem("backText");
    },
  },
  methods: {
    registerFiles: function (event) {
      this.files = event.target.files;
      this.send();
    },
    send: async function () {

      if (this.files != undefined || this.files != {}) {
        let formData = new FormData();

        for (const i of Object.keys(this.files)) {
          formData.append("files", this.files[i]);
        }

        this.axios
            .post("http://localhost:4000/image/uploads/" + localStorage.getItem("uploadId"), formData, {
              headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.axios
                    .get(
                        "http://localhost:4000/memorybook/" +
                        localStorage.getItem("uploadId") +
                        "/images",
                        {
                          headers: {
                            accessToken: localStorage.getItem("accessToken"),
                          },
                        }
                    )
                    .then((res) => {
                      if (res.data.code === 401) {
                        this.$router.push("/login");
                      }

                      if (res.data.code === 200) {
                        this.images = res.data.images;
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    loadImages() {
      this.axios
          .get(
              "http://localhost:4000/memorybook/" +
              localStorage.getItem("uploadId") +
              "/images",
              { headers: { accessToken: localStorage.getItem("accessToken") } }
          )
          .then((res) => {
            if (res.data.code === 401) {
              this.$router.push("/login");
            }

            if (res.data.code === 200) {
              this.images = res.data.images;
            } else {
              router.push("/me");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  mounted() {
      if (this.elementId !== undefined && this.elementId !== "") {
        localStorage.setItem("uploadId", this.elementId);
      }
      if (this.backText !== undefined) {
        localStorage.setItem("backText", this.backText);
      }
      if (this.backPath !== undefined) {
        localStorage.setItem("backPath", this.backPath);
      }
      this.loadImages();



  },
  props: {
    elementId: String,
    backText: String,
    backPath: String,
  },
  components: { ImageDisplayEdit, Back },
};
</script>

<style scoped>
.border-dashed {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='50%2c50' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}

.border-dashed > * {
  align-self: center;
}
</style>