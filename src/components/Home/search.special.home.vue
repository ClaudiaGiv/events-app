<template>
  <div class="mt-auto">
    <!-- container for flight and hotel components -->
    <v-row align="center" justify="space-between" class="pa-4 white search-container flex px-10" no-gutters>

      <div class="py-8 m-2"
           style="width:27%;border:1px solid grey;border-radius:35px;height:90px;display:flex;justify-content:center;align-items:center; vertical-align: middle">

        <v-text-field value="" color="white" background-color="" class="pt-5 px-3 weight-600 font-10 centered-input"
                      solo dense flat placeholder="Oras" v-model="event.location"></v-text-field>
      </div>

      <div class="pa-1"
           style="width:27%;border:1px solid grey;border-radius:35px;height:90px;display:flex;justify-content:end;align-items:end; vertical-align: middle">
        <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :return-value.sync="event.date"
            lazy
            transition="scale-transition"
            offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                v-model="event.date"
                label="Data"
                readonly
                flat
                solo
                dense
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="event.date" no-title scrollable @input="$refs.dateMenu.save(event.date)">
          </v-date-picker>
        </v-menu>
      </div>

      <div class="py-8 m-2"
           style="width:27%;border:1px solid grey;border-radius:35px;height:90px;display:flex;justify-content:center;align-items:center; vertical-align: middle">
        <v-select
            :items="categories"
            item-text="name"
            return-object
            class="pt-5 px-3 weight-600 font-10 centered-input"
            v-model="event.category"
            solo dense flat
            label="Categoria"
        ></v-select>
      </div>
      <v-btn x-large style="height:100px;width:100px;border-radius:50%" color="#3E86F5CC" dark
             @click="$emit('search', event)">
        <v-icon size="25">mdi-magnify</v-icon>
      </v-btn>

    </v-row>
  </div>
</template>

<script>
import * as eventService from "@/services/event-service";

export default {
  data() {
    return {
      event:{
        date: '',
        location:'',
        category: {}
      },
      dateMenu: false,
      categories: [],
      sw: 1,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  async created(){
    this.categories = await eventService.getAllCategories()
  },
  methods:{
    searchEvents(){
     // this.$emit('search',{})
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

.v-menu__content {
  border-radius: 24px !important;
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
