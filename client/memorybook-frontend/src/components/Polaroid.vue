<template>
  <div class="polaroid-card flex flex-column" :class="{ favourite: isFavourite }">
    <div class="medium-grey-bg" style="height:200px;"></div>
    <p class="small-text mt-16 mb-4">01.05.2022 - 04.05.2022</p>
    <h2 class="mb-2">Title</h2>
  </div>
</template>

<script>

export default {
  name: "Polaroid",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  props: {
    isFavourite: Boolean
  },
  components: {},

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

.favourite {
  color: white;
  background-color: #202020;
}

.favourite > .small-text {
  color: #EBEBEB;
}

</style>