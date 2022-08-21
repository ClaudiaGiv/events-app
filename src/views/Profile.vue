<template>
  <div class="mt-16">
    <p class="font-2 weight-600 text-center">Evenimente favorite</p>
    <v-container>
      <v-row v-if="tab==1" no-gutters>
        <v-col cols="12" v-for="i in $store.getters.user.favoriteEvents" :key="i[i+1]" xl="4" lg="4">
          <specialCardVue :eventInfo="i"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Profile",
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
</style>
