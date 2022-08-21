<template>
  <v-container>
    <v-row style="height: 90%" class="pa-4 row-pointer" no-gutters>
      <v-col cols="7" class="mx-auto">
        <v-img eager src="../assets/images/dest1.png" class="hover-pointer"></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-10 post" justify="center">
        <router-view/>
        <router-link to="/" tag="a" class="back">&laquo; Back</router-link>
    </v-row>
  </v-container>
</template>


<style lang="scss" scoped>
.post section html {
  overflow: hidden!important;
}
.post {
  overflow: hidden;
  max-width: 70vw;
  margin: 10rem auto;
  .back {
    background-color: #42b883;
    color: white;
    margin-top: 5rem;
    text-decoration: none;
    padding: 10px 15px;
    border: 1px solid currentColor;
    border-radius: .5rem;
    display: inline-block;
    transition: all .3s ease;
    &:hover {
      background-color: transparent;
      color: #42b883;
    }
  }
  ::v-deep {
    html {
      overflow: hidden!important;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: .2rem;
      color: #42b883;
    }
    h4 {
      margin-bottom: 3rem;
      color: #35495e;
    }
    pre {
      overflow: hidden;
      background-color: #35495e;
      color: white;
      border-radius: .3rem;
      padding: 1rem;
    }
    img {
      max-width: 100%;
    }
  }
}
</style>
