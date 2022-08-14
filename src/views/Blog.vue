<template>
  <v-container>
    <p class="font-2 weight-600 text-center">Articole</p>
    <v-row no-gutters>
      <v-col cols="12" v-for="i in specials.team" :key="i[i+1]" xl="4" lg="4">
        <specialCardBlogVue :info="i" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import specialCardBlogVue from '../components/Home/utilities/special.card.blog.vue'

export default {
  name: "Blog",
  components: {
    specialCardBlogVue
  },
  data() {
    return {

      specials: {
        team: [
          {
            img: require('../assets/images/special1.png'),
            date: "14 FEB 2022",
            tag: "Relax",
            title: "Loga Sea",
            price: 700,
            duration: 'Ceramic Cafe'
          },
          {
            img: require('../assets/images/special2.png'),
            date: "18 JUN 2022",
            tag: "Adventure",
            title: "Ansgar Scheffold",
            price: 400,
            duration: 'Osut'
          },
          {
            img: require('../assets/images/special3.png'),
            date: "22 DEC 2022",
            tag: "Relax",
            title: "Lona X",
            price: 340,
            duration: 'Atelier Cafe'
          },
        ],
      }
    }
  }
}

</script>

<style scoped>

</style>
