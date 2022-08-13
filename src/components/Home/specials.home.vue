<template>
  <div style="position:relative;" class=" sp-container">
    <div class="sh-container">

      <v-container class="hide-xs">
        <searchSpecialHomeVue/>
      </v-container>
    </div>
    <div class="mt-16">
      <!-- container for the upcoming specials -->
      <p class="font-2 weight-600 text-center">Evenimente</p>

      <v-container>
        <v-row v-if="tab==1" no-gutters>
          <v-col cols="12" v-for="i in specials.team" :key="i[i+1]" xl="4" lg="4">
            <specialCardVue :info="i"/>
          </v-col>
        </v-row>
        <v-row v-else-if="tab==2" no-gutters>
          <v-col cols="12" v-for="i in specials.couple" :key="i[i+1]" xl="4" lg="4">
            <specialCardVue :info="i"/>
          </v-col>
        </v-row>
        <v-row v-else no-gutters>
          <v-col cols="12" v-for="i in specials.family" :key="i[i+1]" xl="4" lg="4">
            <specialCardVue :info="i"/>
          </v-col>
        </v-row>

      </v-container>

    </div>
  </div>
</template>

<script>
import searchSpecialHomeVue from './search.special.home.vue'
import specialCardVue from './utilities/special.card.vue'


export default {
  data() {
    return {

      specials: {
        team: [
          {
            img: require('../../assets/images/special1.png'),
            date: "14 FEB 2022",
            tag: "Relax",
            title: "Loga Sea",
            price: 700,
            duration: 'Ceramic Cafe'
          },
          {
            img: require('../../assets/images/special2.png'),
            date: "18 JUN 2022",
            tag: "Adventure",
            title: "Ansgar Scheffold",
            price: 400,
            duration: 'Osut'
          },
          {
            img: require('../../assets/images/special3.png'),
            date: "22 DEC 2022",
            tag: "Relax",
            title: "Lona X",
            price: 340,
            duration: 'Atelier Cafe'
          },
        ],
        couple: [
          {
            img: require('../../assets/images/special1.png'),
            date: "14 FEB 2022",
            tag: "Relax",
            title: "Loga Sea",
            price: 350,
            duration: 'UTCN'
          },
          {
            img: require('../../assets/images/special2.png'),
            date: "18 JUN 2022",
            tag: "Adventure",
            title: "Ansgar Scheffold",
            price: 200,
            duration: 'Atelier Cafe'
          },
          {
            img: require('../../assets/images/special3.png'),
            date: "22 DEC 2022",
            tag: "Relax",
            title: "Lona X",
            price: 150,
            duration: 'OSUT'
          },
        ],
        family: [
          {
            img: require('../../assets/images/special1.png'),
            date: "14 FEB 2022",
            tag: "Relax",
            title: "Loga Sea",
            price: 450,
            duration: 'Primaria Cluj'
          },
          {
            img: require('../../assets/images/special2.png'),
            date: "18 JUN 2022",
            tag: "Adventure",
            title: "Ansgar Scheffold",
            price: 350,
            duration: 'USAMV'
          },
          {
            img: require('../../assets/images/special3.png'),
            date: "22 DEC 2022",
            tag: "Relax",
            title: "Lona X",
            price: 300,
            duration: 'UTCN'
          },
        ]

      }
      ,
      tab: 1,
      tabs: {
        team: 1,
        couple: 2,
        family: 3
      },
      sw: 1

    }
  },
  methods: {
    updateTab(value) {
      this.tab = value;
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

.tab {
  margin: 0 10%;
  background: #FFFFFF;
  height: 8vh;
  border-radius: 13px;
}

.sh-container {
  position: absolute;
  top: -15%;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .sh-container {
    position: absolute;
    top: -3em;
    width: 90% !important;

  }

  .hide-xs {
    display: none !important;
  }
}


</style>
