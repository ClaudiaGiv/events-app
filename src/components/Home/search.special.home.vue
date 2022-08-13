<template>
  <div>
    <div style="">


      <!-- container for flight and hotel components -->
      <v-row align="center" justify="space-between" class="pa-4 white search-container flex px-10" no-gutters>

        <div class="py-8 m-2"
             style="width:27%;border:1px solid grey;border-radius:35px;height:70px;display:flex;justify-content:center;align-items:center; vertical-align: middle">

          <v-text-field value="" color="white" background-color="" class="pt-5 px-3 weight-600 font-10 centered-input"
                        solo dense flat placeholder="Oras"  ></v-text-field>
        </div>
        <div class="py-8 m-2"
             style="width:27%;border:1px solid grey;border-radius:35px;height:70px;display:flex;justify-content:center;align-items:center; vertical-align: middle">
          <v-text-field value="" color="white" background-color="" class="pt-5 px-3 weight-600 font-10 centered-input" type="date"
                        solo dense flat placeholder="Data"></v-text-field>
        </div>
        <div class="py-8 m-2"
             style="width:27%;border:1px solid grey;border-radius:35px;height:70px;display:flex;justify-content:center;align-items:center; vertical-align: middle">
          <v-select
              :items="items"
              label="Categorie"
              class="pt-5 px-3 weight-600 font-10 centered-input"
              solo dense flat
          ></v-select>
<!--          <v-text-field value="" color="white" background-color="" class="pt-5 px-3 weight-600 font-10 centered-input"-->
<!--                        solo dense flat placeholder="Categorie"></v-text-field>-->
        </div>
        <v-btn x-large style="height:100px;width:100px;border-radius:50%" color="#3E86F5CC" dark>
          <v-icon size="25">mdi-magnify</v-icon>
        </v-btn>

      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sw: 1,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  }
}
</script>

<style>
.centered-input >>> input {
  text-align: center;
}
.search-container {
  border-radius: 35px;
  height: 200px;
  width: 90%;
  /*border-top-left-radius: 0px;*/
}
.v-menu__content{
  border-radius:24px !important;
}

@media screen and (max-width: 500px) {
  .search-container {
    border-radius: 35px;
    height: 100px;
    width: 90%;
    /*border-top-left-radius: 0px;*/
  }
}
</style>
