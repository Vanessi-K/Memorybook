<template>
  <Header :text="group.title" >
    <div class="flex-row flex">
      <ImageGrid class="seven columns" :images="group.images"></ImageGrid>
      <div class="five columns serif-font">
        {{group.description}}
      </div>
    </div>
  </Header>
</template>


<script>

import Header from "./Header.vue";
import ImageGrid from "./ImageGrid.vue";
export default {
  name: "ViewGroup",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  props: {
    group: Object
  },
  components: {ImageGrid, Header},
}

</script>

<style scoped>

</style>