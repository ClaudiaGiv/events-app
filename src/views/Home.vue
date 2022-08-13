<template>
  <div class="bg">
   <heroHomeVue />
  <div class="bg-1">
     <specialsHomeVue />

  </div>
  </div>
</template>

<script>
import heroHomeVue from '../components/Home/hero.home.vue'
import specialsHomeVue from '../components/Home/specials.home.vue'

  export default {
    name: 'Home',

    components: {
      heroHomeVue,
      specialsHomeVue
    },
  }
</script>
<style>
.bg{
  margin-top: -50px;
}
</style>
