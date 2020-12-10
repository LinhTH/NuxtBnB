<template>
  <div>
    <div
      v-for="home of homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <home-card :home="home" />
    </div>
  </div>
</template>

<script lang="ts">
import homes from '~/data/homes'
import HomeCard from '~/components/HomeCard.vue'

export default {
  components: { HomeCard },
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
  head() {
    return {
      title: 'HomePage',
      meta: [
        {
          name: `description`,
          content: `This is a homepage!`,

          // Nuxt combines metas from multiple places in app
          // It needs to keep track of which ones are new versus which ones are being updated
          // it does this by using a property called hid.
          // the value does not matter.
          hid: `description`,
        },
      ],
    }
  },
}
</script>
