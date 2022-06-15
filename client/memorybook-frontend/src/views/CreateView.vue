<template>
  <main class="padding-border">
    <div class="flex flex-row">
      <div class="mr-32 flex flex-column">
        <div class="cover-image"></div>
        <button class="btn-primary mt-16">Upload Cover</button>
      </div>
      <div class="flex flex-column grow">
        <div class="flex flex-row">
          <button class="btn-secondary">Share Memory</button>
        </div>
        <div class="flex flex-column mb-16">
          <label>Memorybook title</label>
          <input type="text" v-model="memory.title" name="title" placeholder="Trip to..."/>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-column grow mb-16 mr-16">
            <label>Start date</label>
            <input type="date" v-model="memory.startDate" name="startDate"/>
          </div>
          <div class="flex flex-column grow mb-16">
            <label>End date</label>
            <input type="date" v-model="memory.endDate" name="endDate"/>
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

    <button class="btn-secondary" @click="newImageGroup">New Image Group</button>
  </main>
</template>


<script>

import ImageDisplay from "../components/ImageDisplay.vue";
import Header from "../components/Header.vue";
import CreateGroup from "../components/CreateGroup.vue";
export default {
  name: "CreateView",
  data() {
    return {
      memory: {
        title: "",
        startDate: "",
        endDate: "",
        description: "",
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
    }
  },
  props: {},
  components: {CreateGroup, Header, ImageDisplay},

}

</script>

<style scoped>

.cover-image {
  width: 18vw;
  min-width: 200px;
  height:auto;
  min-height: 200px;
  background-color: #202020;
  flex-grow: 1;
}



</style>