<template>
  <v-container>
    <v-row style="height: 90%" class="pa-4 row-pointer" no-gutters>
      <v-col cols="7" class="mx-auto">
        <v-img eager :src="eventInfo.imgPath" class="hover-pointer"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="mx-auto" >
        <h1 class="hover-pointer text-center">{{ eventInfo.name }}</h1>
      </v-col>
    </v-row>
    <v-row class="mt-10"  justify="center">
      <v-col no-gutters md="auto">
        <v-chip color="blue chip lighten-5" class="pl-5 pr-5"  x-large
        ><span class="font-16 weight-500 blue--text">{{ eventInfo.location }}</span></v-chip>
      </v-col>
      <v-col  no-gutters   md="auto">
        <v-chip color="red chip lighten-5" class="pl-5 pr-5"  x-large
        ><span class="font-16 weight-500 red--text">{{ eventInfo.category.name }}</span></v-chip>
      </v-col>
      <v-col no-gutters md="auto">
        <v-chip color="green chip lighten-5" class="pl-5 pr-5" x-large
        ><span class="font-16 weight-500 green--text">{{ eventInfo.date }}</span></v-chip>
      </v-col>

      <v-col no-gutters md="auto">
        <v-chip color="orange chip lighten-5" class="pl-5 pr-5" x-large
        ><span class="font-16 weight-500 orange--text">{{ eventInfo.organizer.name }}</span></v-chip>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="8" class="mx-auto mt-14">
        <p class="text-center">{{ eventInfo.description }}</p>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Event",
  props: {
    eventInfo: Object
  },
}
</script>

<style scoped>
</style>
