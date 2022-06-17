<template>
  <main class="padding-border">
    <Back back-text="Back to overview" back-path="/me"></Back>
    <div class="flex flex-row">
      <div class="mr-32 flex flex-column spanWidthMobile">
        <img class="cover-image dark-grey-bg border-light" :src="memorybook.cover"/>
        <label class="mt-16 mb-8 button fileupload-button btn-primary ">Upload<input type="file" name="files" @change="registerFile"></label>
      </div>
      <div class="flex flex-column grow">
        <div class="flex flex-row" style="margin-bottom: 1rem">
          <button class="btn-secondary" style="margin-bottom: 0">Share Memory</button>
          <div class="flex flex-center-ai">
            <CustomCheckbox :selected="memorybook.isFavourite" @click="toggleFavourite" style="height: 25px;user-select: none;" class="ml-16"
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
          <button class="btn-primary mr-24">Save Memory</button>
          <button class="btn-secondary">Delete Memory</button>
        </div>
      </div>
    </div>
    <ImageDisplay button-level="btn-secondary" button-value="Upload/Manage general Images"></ImageDisplay>

    <CreateGroup v-for="groupItem in memorybook.groups" :group="groupItem" @buttonAction="deleteImageGroup(groupItem.order)"></CreateGroup>

    <button class="btn-secondary" style="width: 100%;" @click="newImageGroup">New Image Group</button>
  </main>
</template>


<script>

import ImageDisplay from "../components/ImageDisplay.vue";
import Header from "../components/Header.vue";
import CreateGroup from "../components/CreateGroup.vue";
import CustomCheckbox from "../components/CustomCheckbox.vue";
import Back from "../components/Back.vue";

export default {
  name: "CreateView",
  data() {
    return {
      memorybook: {
        memorybookId: undefined,
        title: "",
        description: "",
        cover: "",
        startDate: "",
        endDate: "",
        isFavourite: false,
        groups : [
          {
            title: "Group 1",
            description: "",
            order: 1
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
  },
  methods: {
    newImageGroup() {
      let groupOrder = this.memorybook.groups[this.memorybook.groups.length - 1].order + 1;
      let newGroup = {
        title: "Group " + groupOrder,
        description: "",
        order: groupOrder
      }
      this.memorybook.groups.push(newGroup);
    },
    deleteImageGroup(id) {
      let indexClickedGroup = this.memorybook.groups.findIndex(group => group.order === id);
      this.memorybook.groups.splice(indexClickedGroup, 1);
    },
    validateDate(dateString) {
      let date = new Date(dateString);
      if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date)) {
          // d.getTime() or d.valueOf() will also work
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
    }
  },
  props: {},
  components: {CreateGroup, Header, ImageDisplay, CustomCheckbox, Back},
  mounted() {
    this.axios.post("http://localhost:4000/memorybook/create", {},{headers: {"accessToken":  localStorage.getItem("accessToken")}})
        .then(response => {
          if(response.data.code === 401) {
            this.$router.push("/login");
          }else if(response.data.code === 200 && response.data.id !== undefined) {
            this.memorybook.memorybookId = response.data.id;
            console.log(response.data)
            this.axios.get("http://localhost:4000/memorybook/" + this.memorybook.memorybookId, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
                .then(response => {
                  if(response.data.code === 401) {
                    this.$router.push("/login");
                  }else if(response.data.code === 200) {
                    this.memorybook.title = response.data.memorybook.title
                    this.memorybook.description = response.data.memorybook.description
                    this.memorybook.cover = response.data.memorybook.cover
                    this.memorybook.isFavourite = Boolean(response.data.memorybook.isFavourite)
                    this.memorybook.startDate = response.data.memorybook.startDate
                    this.memorybook.endDate = response.data.memorybook.endDate
                    console.log(response.data.memorybook);
                  }
                })
                .catch(error => {})
          } else{
            this.$router.push("/me");
          }
        })
        .catch(error => {})
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