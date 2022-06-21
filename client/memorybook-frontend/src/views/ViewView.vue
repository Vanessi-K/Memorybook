<template>
  <main class="padding-border">
    <Back back-text="Back to overview" back-path="/me"></Back>

    <div class="flex flex-row">
      <div class="mr-32 flex flex-column spanWidthMobile">
        <img class="cover-image dark-grey-bg border-light" :src="memorybook.cover"/>
      </div>
      <div class="flex flex-row grow flex-space-between-j">
        <div class="flex flex-column" style="align-self: flex-end">
          <h1 class="mb-8">{{memorybook.title}}</h1>
          <p class="small-text mb-2">
            <span v-if="memorybook.startDate"> {{ startDateModifier }}</span>
            <span v-if="memorybook.endDate">- {{ endDateModifier }}</span>
          </p>
        </div>
        <RouterLink :to="{name: 'edit', params:{memorybookId: memorybook.memorybookId}}" class="button btn-secondary">Edit Memorybook</RouterLink>
        </div>
    </div>

    <p class="mt-24 mb-64 serif-font">{{memorybook.description}}</p>

    <ImageGrid :images="memorybook.images"></ImageGrid>

    <ViewGroup v-for="groupItem in memorybook.groups" :group="groupItem" ></ViewGroup>

  </main>
</template>


<script>

import ImageGrid from "../components/ImageGrid.vue";
import Header from "../components/Header.vue";
import ViewGroup from "../components/ViewGroup.vue";
import CustomCheckbox from "../components/CustomCheckbox.vue";
import Back from "../components/Back.vue";
import Alert from "../components/Alert.vue";

export default {
  name: "CreateView",
  data() {
    return {
      memorybook: {
        memorybookId: undefined,
        title: "",
        description: "",
        cover: "http://localhost:4000/uploads/placeholder.png",
        startDate: null,
        endDate: null,
        isFavourite: false,
        images: [],
        groups : [
          {
            groupId: 0,
            title: "Group 1",
            description: "",
            orderId: 1,
            images: []
          }
        ]
      }
    }
  },
  computed: {
    startDateModifier() {
      let dbDate = new Date(this.memorybook.startDate);
      return dbDate.toDateString();
    },
    endDateModifier() {
      let dbDate = new Date(this.memorybook.endDate);
      return dbDate.toDateString();
    }
  },
  methods: {
    },
  props: {
    memorybookId: String
  },
  components: {Alert, ViewGroup, Header, ImageGrid, CustomCheckbox, Back},
  mounted() { {
        this.axios.get("http://localhost:4000/memorybook/full/" + this.memorybookId, {headers: {"accessToken":  localStorage.getItem("accessToken")}})
            .then(response => {
              this.memorybook = response.data.memorybook;
            })
            .catch(error => {console.log(error)})
      }

  }

}

</script>

<style scoped>

.cover-image {
  width: 100%;
  min-width: 200px;
  height:auto;
  min-height: 200px;
  flex-grow: 1;
}

@media screen and (max-width: 858px) {
  .spanWidthMobile {
    margin-bottom: 32px;
    width: 100%;
    margin-right: 0;
  }
}

@media screen and (min-width: 859px) {
  .spanWidthMobile {
    width: auto;
  }
}

@media screen and (min-width: 1000px) {
  .spanWidthMobile {
    width: 18vw;
  }
}

.dark-grey-font-color {
  color: #202020;
}

</style>