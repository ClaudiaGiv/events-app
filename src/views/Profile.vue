<template>
  <div class="mt-16">
    <p class="font-2 weight-600 text-center">Evenimente favorite</p>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" v-for="i in $store.getters.user.favoriteEvents" :key="i[i+1]" xl="4" lg="4" class="card-border">
          <specialCardVue :eventInfo="{...i, isFavorite: true}" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import specialCardVue from "@/components/Home/utilities/special.card";

export default {
  name: "Profile",
  components: {
    specialCardVue,
  },
  data() {
    return {
      events: [],
      user: {}
    }
  },
  async created() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      this.user = store.getters.user
      this.events = this.user.events || []
    }
  }
}
</script>

<style scoped>
.card-border{
  border: 2px solid #2196f3;
  border-radius: 5%;
}
</style>
