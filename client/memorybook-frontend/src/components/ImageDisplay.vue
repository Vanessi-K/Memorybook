<template>
  <main class="mt-24 pt-24 mb-24 border-top flex flex-column">
    <div class="flex-row flex mb-16 gap flex-space-between-j">
      <img v-for="image in images" :src="image"/>
    </div>
    <button :class="buttonLevel">{{buttonValue}}</button>
  </main>
</template>


<script>

export default {
  name: "ImageDisplay",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  props: {
    images: Array,
    buttonLevel: String,
    buttonValue: String
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