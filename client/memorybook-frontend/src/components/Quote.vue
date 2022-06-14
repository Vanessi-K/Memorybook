<template>
  <div class="border-left pl-32 pt-32">
    <p class="quote">{{quoteText}}</p>
    <p>- {{author}}</p>
  </div>
</template>

<script>
export default {
  name: "Quote",
  data() {
    return {}
  },
  computed: {},
  methods: {},
  props: {
    quoteText: String,
    author:String
  },
  components: {}
}
</script>

<style scoped>
  .quote {
    font-family: bodoni-urw, serif;
    font-weight: 1000;
    font-style: normal;
    font-size: 4vw;
    line-height: 1.2;
  }



</style>