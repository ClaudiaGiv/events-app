<template>
  <div style="position:relative;" class=" sp-container">
    <div class="sh-container">
      <v-container class="hide-xs">
        <searchSpecialHomeVue @search="searchEvents"/>
      </v-container>
    </div>
    <div class="mt-16">
      <p class="font-2 weight-600 text-center">Evenimente</p>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" v-for="i in events" :key="i[i+1]" xl="4" lg="4">
            <specialCardVue :eventInfo="i"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import searchSpecialHomeVue from './search.special.home.vue'
import specialCardVue from './utilities/special.card.vue'
import * as eventService from '../../services/event-service'

export default {
  data() {
    return {
      events: [],
    }
  },
  async created() {
    await this.initialize()
  },
  methods: {
    async initialize() {
      this.events = await eventService.getAllEvents()
      console.log('----EVENTS-----')
      console.log(this.events)
    },
    async searchEvents(event){
      this.events = await eventService.getEventsBy(event.location, event.category, event.date)
    }
  },
  components: {
    specialCardVue,
    searchSpecialHomeVue
  }
}
</script>

<style>
.sp-container {
  padding: 4%;
}
.sh-container {
  position: absolute;
  top: -15%;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .sh-container {
    position: absolute;
    top: -5%;
    width: 90% !important;

  }
  .hide-xs {
    display: none !important;
  }
}
</style>
