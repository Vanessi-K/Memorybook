<template>
  <div>
    <h2 class="border-bottom pl-24">
      {{ text }}
    </h2>
    <div class="mb-24 mt-24 mr-24 ml-24">
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>