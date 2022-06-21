<template>
  <main class="flex flex-column">
    <div class="flex-row flex mb-16 gap flex-space-between-j">
      <img v-for="image in images" :src="image.path"/>
    </div>
  </main>
</template>


<script>

export default {
  name: "ImageGrid",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
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