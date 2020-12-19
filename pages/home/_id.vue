<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
        alt="home image"
      />
    </div>
    {{ home.title }} <br />
    {{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" width="20" height="20" />{{
      home.location.address
    }}
    {{ home.location.city }}
    {{ home.location.state }}
    {{ home.location.country }}<br />
    <img src="/images/star.svg" width="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} baths <br />
    <div ref="map" style="height: 800px; width: 800px"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" /><br />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <short-text :text="review.comment" :target="150" /> <br />
    </div>
  </div>
</template>

<script>
import ShortText from '@/components/ShortText'
export default {
  components: { ShortText },
  layout: 'red',

  /**
   * This is a special Nuxt hook that runs once server side and then run again client-side when navigating to other routes. Whatever you return from asyncData will be merged with the page's local data object. Nuxt will wait for the response before rendering the page
   * @param params
   * @param $dataApi
   * @returns {Promise<{home: *}>}
   */
  async asyncData({ params, $dataApi, error }) {
    const homeResponse = await $dataApi.getHome(params?.id)

    if (!homeResponse.ok)
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      })

    const reviewResponse = await $dataApi.getReviewsByHomeId(params?.id)
    if (!reviewResponse.ok) {
      return error({
        statusCode: reviewResponse.status,
        message: reviewResponse.statusText,
      })
    }

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
    }
  },
  data() {
    return {
      home: {},
    }
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('vi-VN', {
        month: 'long',
        year: 'numeric',
      })
    },
  },
  head() {
    return {
      title: this.home.title,
    }
  },
}
</script>
