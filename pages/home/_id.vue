<template>
  <div>{{ home.title }}</div>
</template>

<script lang="ts">
import homes from '~/data/homes'

export default {
  data() {
    return {
      home: {},
    }
  },
  // In Nuxt, the method is ran on both the server and on the client on the first page view
  created() {
    this.home = homes.find((home) => home.objectID === this.$route?.params?.id)
  },
}
</script>
