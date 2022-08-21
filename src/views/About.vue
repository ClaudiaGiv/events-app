<template>
  <v-container>
    <contactHomeVue />
    <testimonialHomeVue />
    <discountHomeVue />
  </v-container>
</template>

<script>
import contactHomeVue from '../components/Home/contact.home.vue'
import discountHomeVue from '../components/Home/discount.home.vue'
import testimonialHomeVue from '../components/Home/testimonial.home.vue'

export default {
  name: 'About',
  components: {
    contactHomeVue,
    testimonialHomeVue,
    discountHomeVue
  },
}
</script>
<style>
.bg{
  margin-top: -50px;
}
</style>
