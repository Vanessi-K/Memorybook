<template>
  <main class="mt-24 pt-24 mb-24 border-top flex flex-column">
    <div class="flex-row flex dark-grey-bg mb-16" style="height:200px"></div>
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
    buttonValue: String,
    buttonLevel: String
  },
  components: {},

}

</script>

<style scoped>

</style>