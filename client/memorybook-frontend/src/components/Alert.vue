<template>

  <div class="light-red-bg red border-red pt-8 pb-8 pr-16 pl-16">
    <p class="mb-2" v-for="texts in alertTexts" >
      {{texts}}
    </p>
  </div>
</template>

<!--<p class="light-red-bg red border-red pt-8 pb-24 pr-32 pl-32">{{alertText}}</p>-->

<script>
export default {
  name: "Alert",
  props: {
    alertTexts: Object
  }
}
</script>

<style scoped>

</style>