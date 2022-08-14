<template>
  <div>
    <v-card class="pa-2 pb-10 card" color="white" flat>
      <div class="card-inner-1">
        <v-row style="height: 100%" class="pa-4" no-gutters>
          <v-col cols="10" class="">
            <v-img eager :src="info.img"> </v-img>
          </v-col>
          <v-col cols="2">
            <p class="special-text ml-5 font-6 mt-5">{{info.date}}</p>
          </v-col>
        </v-row>
      </div>

      <div class="card-inner-2">
        <p class="font-4 weight-600">{{info.title}}</p>
        <v-row align="center" justify="center" no-gutters>
          <v-chip color="red chip lighten-5" class="pl-3 pr-3" small
          ><router-link to="/blog-post-1" class="font-7 red--text">Read more</router-link></v-chip
          >
          <v-spacer></v-spacer>
        </v-row>


      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props:['info']
};
</script>

<style>
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
