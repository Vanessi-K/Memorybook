<template>
  <div>
    <div class="border-bottom pl-24 pr-24 flex-row flex flex-space-between-j">
      <h2 class="mb-2">
        {{ text }}
      </h2>
      <button :class="buttonLevel">{{buttonValue}}</button>
    </div>

    <div class="mb-24 mt-24 mr-24 ml-24" >
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header",
  props: {
    text: String,
    buttonValue: String,
    buttonLevel: String,
  }
}
</script>

<style scoped>

</style>