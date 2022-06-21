<template>
    <Header button-level="btn-secondary" :text="group.title" @buttonAction="" button-value="Delete Image Group">
      <div class="flex-column flex">
        <div class="flex flex-column mb-16">
          <label>Memorybook title</label>
          <input type="text" v-model="group.title" name="title" placeholder="Trip to..."/>
        </div>
        <div class="flex flex-column mb-16">
          <label>Description</label>
          <textarea v-model="group.description" name="endDate" placeholder="It was..."></textarea>
        </div>
      </div>
      <ImageDisplay button-value="Upload/Manage Images" :back-path="backPath" :back-text="backText" @saveAction="saveAction" button-level="btn-primary" :images="group.images" :elementId="group.groupId"></ImageDisplay>
    </Header>
</template>


<script>

import Header from "./Header.vue";
import ImageDisplay from "./ImageDisplay.vue";
export default {
  name: "CreateGroup",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    buttonAction() {
      this.$emit('buttonAction');
    },
    saveAction() {
      this.$emit('saveAction');
    }
  },
  props: {
    group: Object,
    backText: String,
    backPath: String,
  },
  components: {ImageDisplay, Header},
 }

</script>

<style scoped>

</style>