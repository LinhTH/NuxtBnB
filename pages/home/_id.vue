<template>
  <div>{{ home.title }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import homes from '~/data/homes.json'

export default Vue.extend({
  data() {
    return {
      home: {} as any,
    }
  },
  // In Nuxt, the method is ran on both the server and on the client on the first page view
  created() {
    this.home = homes.find(
      (home: any) => home.objectID === this.$route?.params?.id
    )
  },
})
</script>
