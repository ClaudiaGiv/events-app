<template>
  <v-container>
    <p class="font-2 weight-600 text-center">Articole</p>
    <v-row no-gutters>
      <v-col cols="12" v-for="(entry, index) in entries" :key="index"  xl="4" lg="4">
        <blogCard :post="entry" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BlogEntries from '@/data/blogs.json'
import blogCard from '../components/blog-card'

export default {
  name: "Blog",
  components: {
    blogCard
  },
  computed: {
    entries() {
      return BlogEntries
    }
  },
}
</script>

<style scoped>
</style>
