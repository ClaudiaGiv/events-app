<template>
  <upload :dialog.sync="uploadDialog" :multiple="true" @filesUploaded="processUpload($event)"
  />
</template>

<script>
import upload from '../components/upload.vue'

export default {
  name: "Admin",
  components: {
    upload
  },
  data() {
    return {
      uploadDialog: true
    }
  },
  methods: {
    processUpload(event) {
      console.log(event)
    }
  },
}
</script>

<style scoped>

</style>
