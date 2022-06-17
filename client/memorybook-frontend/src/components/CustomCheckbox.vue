<template>
    <Star :selected="selected" style="max-height:100%;"/>
</template>

<script>
import Star from "./Icons/Star.vue";

export default {
  name: "CustomCheckbox",
  components: {
    Star,
  },
  props: {
    selected: Boolean,
  },
};
</script>

<style scoped></style>
