<template>
  <main class="padding-border">
    <div class="flex flex-row">
      <div class="mr-32 flex flex-column spanWidthMobile">
        <div class="cover-image" ></div>
        <button class="btn-primary mt-16">Upload Cover</button>
      </div>
      <div class="flex flex-column grow">
        <div class="flex flex-row" style="margin-bottom: 1rem">
          <button class="btn-secondary" style="margin-bottom: 0">Share Memory</button>
          <div class="flex flex-center-ai">
            <CustomCheckbox :selected="memory.isFavourite" @click="toggleFavourite" style="height: 25px;user-select: none;" class="ml-16"
            ></CustomCheckbox>
          </div>
        </div>
        <div class="flex flex-column mb-16">
          <label>Memorybook title</label>
          <input type="text" v-model="memory.title" name="title" placeholder="Trip to..."/>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-column grow mb-16 mr-16">
            <label>Start date</label>
            <input type="date" v-model="memory.startDate" :class="{ 'dark-grey-font-color': validStartValue }" name="startDate"/>
          </div>
          <div class="flex flex-column grow mb-16">
            <label>End date</label>
            <input type="date" v-model="memory.endDate" :class="{ 'dark-grey-font-color': validEndValue }" name="endDate"/>
          </div>
        </div>
        <div class="flex flex-column mb-16">
          <label>Description</label>
          <textarea v-model="memory.description" name="description" placeholder="It was..."></textarea>
        </div>
        <div class="flex flex-row">
          <button class="btn-primary mr-24">Save Memory</button>
          <button class="btn-secondary">Delete Memory</button>
        </div>
      </div>
    </div>
    <ImageDisplay button-level="btn-secondary" button-value="Upload/Manage general Images"></ImageDisplay>

    <CreateGroup v-for="groupItem in memory.groups" :group="groupItem" @buttonAction="deleteImageGroup(groupItem.order)"></CreateGroup>

    <button class="btn-secondary" style="width: 100%;" @click="newImageGroup">New Image Group</button>
  </main>
</template>


<script>

import ImageDisplay from "../components/ImageDisplay.vue";
import Header from "../components/Header.vue";
import CreateGroup from "../components/CreateGroup.vue";
import CustomCheckbox from "../components/CustomCheckbox.vue";

export default {
  name: "CreateView",
  data() {
    return {
      memory: {
        title: "",
        startDate: "",
        endDate: "",
        description: "",
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
    validStartValue: function () {
      return this.validateDate(this.memory.startDate);
    },
    validEndValue: function () {
      return this.validateDate(this.memory.endDate);
    },
  },
  methods: {
    newImageGroup() {
      let groupOrder = this.memory.groups[this.memory.groups.length - 1].order + 1;
      let newGroup = {
        title: "Group " + groupOrder,
        description: "",
        order: groupOrder
      }
      this.memory.groups.push(newGroup);
    },
    deleteImageGroup(id) {
      let indexClickedGroup = this.memory.groups.findIndex(group => group.order === id);
      this.memory.groups.splice(indexClickedGroup, 1);
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
      this.memory.isFavourite = !this.memory.isFavourite;
    }
  },
  props: {},
  components: {CreateGroup, Header, ImageDisplay, CustomCheckbox},

}

</script>

<style scoped>

.cover-image {
  width: 100%;
  min-width: 200px;
  height:auto;
  min-height: 200px;
  background-color: #202020;
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