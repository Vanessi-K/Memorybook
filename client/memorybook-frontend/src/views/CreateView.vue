<template>
  <main class="padding-border">
    <div class="flex flex-row">
      <div class="mr-32 flex flex-column spanWidthMobile">
        <img class="cover-image dark-grey-bg border-light" :src="memorybook.cover"/>
        <label class="mt-16 mb-8 button fileupload-button btn-primary ">Upload<input type="file" name="files" @change="registerFile"></label>
      </div>
      <div class="flex flex-column grow">
        <div class="flex flex-row" style="margin-bottom: 1rem">
          <button class="btn-secondary" style="margin-bottom: 0">Share Memory</button>
          <div class="flex flex-center-ai">
            <CustomCheckbox :selected="favouriteState" @click="toggleFavourite" style="height: 25px;user-select: none;" class="ml-16"
            ></CustomCheckbox>
          </div>
        </div>
        <div class="flex flex-column mb-16">
          <label>Memorybook title</label>
          <input type="text" v-model="memorybook.title" name="title" placeholder="Trip to..."/>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-column grow mb-16 mr-16">
            <label>Start date</label>
            <input type="date" v-model="memorybook.startDate" :class="{ 'dark-grey-font-color': validStartValue }" name="startDate"/>
          </div>
          <div class="flex flex-column grow mb-16">
            <label>End date</label>
            <input type="date" v-model="memorybook.endDate" :class="{ 'dark-grey-font-color': validEndValue }" name="endDate"/>
          </div>
        </div>
        <div class="flex flex-column mb-16">
          <label>Description</label>
          <textarea v-model="memorybook.description" name="description" placeholder="It was..."></textarea>
        </div>
        <div class="flex flex-row">
          <button class="btn-primary mr-24" @click="saveMemorybook">Save Memory</button>
          <button class="btn-secondary" @click="deleteMemorybook">Delete Memory</button>
        </div>
      </div>
    </div>
    <ImageDisplay back-path="/me/create" back-text="Back to creating" @saveAction="cacheMemorybook" button-level="btn-secondary" button-value="Upload/Manage general Images" :images="memorybook.images"  :elementId="memorybook.memorybookId"></ImageDisplay>

    <CreateGroup v-for="groupItem in memorybook.groups" :group="groupItem" @saveAction="cacheMemorybook" @buttonAction="deleteImageGroup(groupItem.groupId)" back-path="/me/create" back-text="Back to creating"></CreateGroup>

    <button class="btn-secondary" style="width: 100%;" @click="newImageGroup">New Image Group</button>
  </main>
</template>


<script>

import ImageDisplay from "../components/ImageDisplay.vue";
import Header from "../components/Header.vue";
import CreateGroup from "../components/CreateGroup.vue";
import CustomCheckbox from "../components/CustomCheckbox.vue";
import Back from "../components/Back.vue";
import Alert from "../components/Alert.vue";
import router from "../router";

export default {
  name: "CreateView",
  data() {
    return {
      memorybook: {
        memorybookId: undefined,
        title: "",
        description: "",
        cover: "http://localhost:4000/uploads/placeholder.png",
        startDate: null,
        endDate: null,
        isFavourite: false,
        images: [],
        groups : [
          {
            groupId: 0,
            title: "Group 1",
            description: "",
            orderId: 1,
            images: []
          }
        ]
      }
    }
  },
  computed: {
    fileUploadTarget() {
      return "http://localhost:4000/memorybook/" + this.memorybook.memorybookId + "/cover"
    },
    validStartValue(){
      return this.validateDate(this.memorybook.startDate);
    },
    validEndValue() {
      return this.validateDate(this.memorybook.endDate);
    },
    favouriteState() {
      return Boolean(this.memorybook.isFavourite);
    }
  },
  methods: {
    newImageGroup() {
      let groupOrder = 1;
      //Check if groups already exist
      if(this.memorybook.groups.length) {
        groupOrder = parseInt(this.memorybook.groups[this.memorybook.groups.length - 1].orderId) + 1;
      }

      this.axios.post("http://localhost:4000/memorybook/create/group/", {memorybookId: this.memorybook.memorybookId, orderId: groupOrder},{headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then(response => {
            //Create empty group and save id
            if(response.data.code === 200) {
              let newGroup = {
                groupId: response.data.id,
                title: "Group " + groupOrder,
                description: "",
                orderId: groupOrder,
                images: []
              }
              this.memorybook.groups.push(newGroup);
            }
          })
          .catch(error => {})


      // this.axios.get("http://localhost:4000/memorybook/" + this.memorybook.memorybookId + "/group/")
      //     .then(result => {
      //       ths.memorybook.groups = result.data.groups;
      //     })
      //     .catch(error => {})

    },
    deleteImageGroup(id) {
      let indexClickedGroup = this.memorybook.groups.findIndex(group => group.groupId === id);

      this.axios.get("http://localhost:4000/memorybook/" + this.memorybook.groups[indexClickedGroup] + "/group/delete", {headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .catch(error => {})

      this.memorybook.groups.splice(indexClickedGroup, 1);
    },
    validateDate(dateString) {
      let date = new Date(dateString);
      if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date)) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
    toggleFavourite() {
      this.memorybook.isFavourite = !this.memorybook.isFavourite;
    },
    registerFile (event) {
      this.files = event.target.files;
      this.send();
    },
    send: async function() {
      if (this.files != undefined || this.files != {}) {

        let formData = new FormData();

        for (const i of Object.keys(this.files)) {
          formData.append('files', this.files[i])
        }

        this.axios.post(this.fileUploadTarget, formData, {headers: {"accessToken": localStorage.getItem("accessToken")}})
            .then((res) => {
              if (res.data.code === 200) {
                this.memorybook.cover = res.data.file;
              }
            })
            .catch(error => {
              console.log(error);
            })
      }
    },
    saveMemorybook() {
        this.axios.post("http://localhost:4000/memorybook/full/" + this.memorybook.memorybookId + "/save/", {memorybook: this.memorybook}, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
            .then(result => {
              localStorage.removeItem("activeCreate");
              this.$router.push("/me");
            })
            .catch(error => {});
      },
      cacheMemorybook(){
        this.axios.post("http://localhost:4000/memorybook/full/" + this.memorybook.memorybookId + "/save/", {memorybook: this.memorybook}, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
            .then(result => {})
            .catch(error => {});
      },
      deleteMemorybook() {
        this.axios.post("http://localhost:4000/memorybook/full/" + this.memorybook.memorybookId + "/delete/", {memorybook: this.memorybook}, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
            .then(result => {
              localStorage.removeItem("activeCreate");
              this.$router.push("/me");
            })
            .catch(error => {});
      }
    },
  props: {
  },
  components: {Alert, CreateGroup, Header, ImageDisplay, CustomCheckbox, Back},
  mounted() {

    if(!Boolean((localStorage.getItem("activeCreate")))) {
      //create an empty memorybook
      this.axios.post("http://localhost:4000/memorybook/create", {},{headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then(response => {
            if(response.data.code === 401) {
              this.$router.push("/login");
            }else if(response.data.code === 200 && response.data.id !== undefined) {
              this.memorybook.memorybookId = response.data.id;
                    //Create empty group
              this.axios.post("http://localhost:4000/memorybook/create/group", {memorybookId: this.memorybook.memorybookId, orderId: 1},{headers: {"accessToken":  localStorage.getItem("accessToken")}})
              .then(result => {
                this.memorybook.groups[0].groupId = result.data.id;
                localStorage.setItem("activeCreate", this.memorybook.memorybookId);

                this.cacheMemorybook();
              })

            } else{
              this.$router.push("/me");
            }
          })
          .catch(error => {})
    } else if(Boolean(localStorage.getItem("activeCreate"))) {

      this.axios.get("http://localhost:4000/memorybook/full/" + localStorage.getItem("activeCreate"), {headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then(response => {
              if(response.data.code === 404) {
                router.push("/me");
              }
              if(response.data.code == 200) {
                this.memorybook = response.data.memorybook;
              }
            })
          .catch(error => {console.log(error)})

    }
  }

}

</script>

<style scoped>

.cover-image {
  width: 100%;
  min-width: 200px;
  height:auto;
  min-height: 200px;
  flex-grow: 1;
}

@media screen and (max-width: 858px) {
  .spanWidthMobile {
    margin-bottom: 32px;
    width: 100%;
    margin-right: 0;
  }
}

@media screen and (min-width: 859px) {
  .spanWidthMobile {
    width: auto;
  }
}

@media screen and (min-width: 1000px) {
  .spanWidthMobile {
    width: 18vw;
  }
}

.dark-grey-font-color {
  color: #202020;
}

</style>