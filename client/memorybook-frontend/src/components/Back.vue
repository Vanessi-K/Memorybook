<template>
  <RouterLink :to="backPath" class="flex flex-row gap mb-32">
    <LeftArrow style="max-height:24px;"></LeftArrow>
    <p class="no-link ">{{backText}}</p>
  </RouterLink>
</template>

<!--<p class="light-red-bg red border-red pt-8 pb-24 pr-32 pl-32">{{alertText}}</p>-->

<script>
import LeftArrow from "./Icons/LeftArrow.vue";
export default {
  name: "Back",
  components: {LeftArrow},
  props: {
    backText: String,
    backPath: String
  }
}
</script>

<style scoped>
p {
  margin: 0;
  font-weight: bold;
}

</style>