<template>
  <main class=" flex flex-column">
    <div v-for="image in images" class="border-top pt-24 pb-24 pr-24 pl-24 flex flex-row flex-center-ac flex-space-between-j">
      <img :src="image.path"/>
      <p>{{image.path}}</p>
      <div class="flex flex-row gap">
<!--        <Edit style="max-height:24px;"></Edit>-->
        <Delete style="max-height:24px;" class="red" @click="deleteImage(image.imageId)"></Delete>
      </div>

    </div>
  </main>
</template>


<script>

import Edit from "./Icons/Edit.vue";
import Delete from "./Icons/Delete.vue";
export default {
  name: "ImageDisplayEdit",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    deleteImage(imageId) {
      this.axios.get("http://localhost:4000/memorybook/images/" + imageId +"/delete", {headers: {"accessToken":  localStorage.getItem("accessToken")}})
          .then(result => this.$emit('reloadAction'))
      .catch(error => {})
    }
  },
  props: {
    images: Array,
    buttonLevel: String,
    buttonValue: String
  },
  components: {Edit, Delete},

}

</script>

<style scoped>

img {
  height: auto;
  width: 100px;
  border: 1px solid #EBEBEB;
}

</style>