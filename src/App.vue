<template>
  <v-app class="animate__animated animate__fadeIn animate__slow">
    <v-app-bar
        :color="color"
        class=""
        fixed
        style="padding:0 5%"
        dark
        flat
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <p class="font-2 mb-n1" :style="`color:${colo}`">Home</p>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex">
        <div class="d-flex align-center">
          <router-link to="/">
            <v-btn style="text-transform:none" class="font-7" text plain>Evenimente</v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn style="text-transform:none" class="font-7" text plain>Despre</v-btn>
          </router-link>
          <router-link to="/blog">
            <v-btn style="text-transform:none" class="font-7" text plain>Blog</v-btn>
          </router-link>
          <router-link to="/admin" v-if="$store.getters.user && $store.getters.user.role === 'Organizator'">
            <v-btn style="text-transform:none" class="font-7" text plain>Admin</v-btn>
          </router-link>
          <router-link to="/profile" v-if="$store.getters.user && $store.getters.user.role === 'Utilizator'">
            <v-btn style="text-transform:none" class="font-7" text plain>Profil</v-btn>
          </router-link>
          <router-link to="/register" v-if="Object.keys($store.getters.user).length == 0">
            <v-btn style="text-transform:none" large class="font-7 white blue--text">Sign in</v-btn>
          </router-link>
          <div @click="logout" v-if="Object.keys($store.getters.user).length != 0">
            <v-btn style="text-transform:none" large class="font-7 white blue--text">Log out</v-btn>
          </div>
        </div>
      </div>
      <v-app-bar-nav-icon class="d-flex d-sm-none"/>
    </v-app-bar>
    <v-main class="main">
      <router-view/>
    </v-main>
    <v-footer class="bg-1 ">
      <v-container>
        <div class="d-sm-none d-md-flex">
          <v-row no-gutters style="" class="footer d-none d-sm-flex ">
            <v-spacer></v-spacer>
            <div class="jst" style="display:flex">
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Evenimente</v-btn>
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Despre</v-btn>
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Blog</v-btn>
            </div>
          </v-row>
        </div>
        <v-row no-gutters style="width:100%" class="footer d-flex d-sm-none d-none d-sm-flex d-md-none">
          <v-spacer></v-spacer>
          <div>
            <div style="display:flex">
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Evenimente</v-btn>
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Despre</v-btn>
              <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>Blog</v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import "./css/fonts.css"

export default {
  name: 'App',
  data: () => ({
    color: "whitesmoke",
    colo: "grey",
  }),
  mounted() {
    // const navbar = document.getElementById("nav-bar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        this.color = "whitesmoke";
        this.colo = "grey";
        // navbar.classList.add("scale-in-center");
      } else {
        // this.color = "transparent";
        // this.colo = "white";
        // navbar.classList.remove("scale-in-center");
        // navbar.classList.add("scale-out-center");
      }
    });
  },
  // beforeCreate() {
  //   this.$store.commit('INIT');
  // },
  methods: {
    logout() {
      this.$store.commit('SET_USER', {})
      this.$router.push({name: 'Register'})
    }
  }
};
</script>

<style>
.footer {
  padding: 4%;
}
@media screen and (max-width: 600px) {
  .footer {
    padding: 10%;
  }
}
.main {
  margin-top: 80px;
}
</style>
