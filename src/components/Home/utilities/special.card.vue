<template>
  <div>
    <v-card class="pa-2 pb-10 card" color="white" flat>
      <div class="card-inner-1">
        <v-row style="height: 100%" class="pa-4 row-pointer" no-gutters>
          <v-col cols="10" class="">
            <v-img eager :src="eventInfo.imgPath" class="hover-pointer" @click="goToEvent"></v-img>
          </v-col>
          <v-col cols="2">
            <p class="special-text ml-5 font-6 mt-5">{{ eventInfo.date }}</p>
          </v-col>
        </v-row>
      </div>
      <div class="card-inner-2">
        <p class="font-4 weight-600 hover-pointer" @click="goToEvent">{{ eventInfo.name }}</p>
        <v-row align="center" justify="center" no-gutters>
          <v-chip color="red chip lighten-5" class="pl-3 pr-3" small
          ><span class="font-7 red--text">{{ eventInfo.category.name }}</span></v-chip
          >
          <p class="mb-n1 ml-3 font-7 grey--text">{{ eventInfo.name }}</p>
          <v-spacer></v-spacer>
          <v-btn icon color="pink" v-if="eventInfo.isFavorite !== undefined" @click="markFavorite">
            <v-icon v-if="eventInfo.isFavorite">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart-outline</v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import router from "@/router";
import {addFavoriteEvent, removeFavoriteEvent} from "../../../services/event-service";

export default {
  props: {
    eventInfo: Object
  },
  methods: {
    goToEvent() {
      router.push({
        name: 'Event',
        params: {
          eventInfo: this.eventInfo
        }
      })
    },
    async markFavorite() {
      if (!this.eventInfo.isFavorite) {
        await addFavoriteEvent(this.eventInfo)
        this.eventInfo.isFavorite = true
      } else {
        await removeFavoriteEvent(this.eventInfo.id)
        this.eventInfo.isFavorite = false
      }
    }
  }
};
</script>

<style>
.hover-pointer {
  cursor: pointer;
}
.card {
  /*height: 70vh;*/
  border-radius: 45px !important;

  margin: 5%;
}
.card-inner-1 {
  height: 65%;
}
.card-inner-2 {
  height: 35%;
  padding: 3% 6%;
}
.special-text {
  writing-mode: vertical-rl;
  letter-spacing: 7px;
}
@media screen and (max-width: 600px) {
  .card {
    height: 50vh;
    border-radius: 45px !important;

    margin: 5%;
  }
  .chip {
    height: 18px !important;
  }
  .card-inner-2 {
    height: 35%;
    padding: 2% 6%;
  }
}
</style>
