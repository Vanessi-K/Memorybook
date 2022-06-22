<template>
  <main class="mt-24 pt-24 mb-24 border-top flex flex-column">
    <div class="flex-row flex mb-16 gap">
      <img v-for="image in images" :src="image.path"/>
    </div>
    <RouterLink class="flex no-textdecoration" @click="saveAction" :to="{name: 'upload', params:{elementId, backText, backPath}}"><button class="grow" :class="buttonLevel">{{buttonValue}}</button></RouterLink>
  </main>
</template>


<script>

import {RouterLink} from "vue-router";

export default {
  name: "ImageDisplay",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    saveAction() {
      this.$emit('saveAction');
    }
  },
  props: {
    images: Object,
    buttonLevel: String,
    buttonValue: String,
    elementId: Number,
    backPath: String,
    backText: String
  },
  components: {},

}

</script>

<style scoped>

img {
  height: 300px;
  width: auto;
}

</style>