<template>
  <RouterLink  :to="{name: 'view', params:{memorybookId: memory.memorybookId}}" to="/me/memorybook" class="polaroid-card flex flex-column" :class="{ favourite: memory.isFavourite }">
    <div class="polaroid-image" :style="{backgroundImage: cssImageString}"/>
    <p class="small-text mt-16 mb-4"><span v-if="memory.startDate"> {{ startDateModifier }}</span><span v-if="memory.endDate">- {{ endDateModifier }}</span></p>
    <h2 class="mb-2">{{memory.title}}</h2>
  </RouterLink>
</template>

<script>
import {RouterLink} from "vue-router";

export default {

  name: "Polaroid",
  data() {
    return {
    }
  },
  computed: {
    cssImageString() {
      return "url(" + this.memory.cover + ")";
    },
    startDateModifier() {
      let dbDate = new Date(this.memory.startDate);
      return dbDate.toDateString();
    },
    endDateModifier() {
      let dbDate = new Date(this.memory.endDate);
      return dbDate.toDateString();
    }
  },
  methods: {
  },
  props: {
    memory: Object
  },
  components: {}

}
</script>

<style scoped>

.polaroid-card {
  padding: 32px 32px 24px 32px;
  border: 1px solid #202020;
  min-width: 200px;
  width: 12vw;
  flex-grow: 1;
}

.polaroid-image {
  background-size:cover;
  box-sizing: border-box;
  background-position: center;
  height: 200px;
}

.favourite {
  color: white;
  background-color: #202020;
}

.favourite > .small-text {
  color: #EBEBEB;
}

</style>