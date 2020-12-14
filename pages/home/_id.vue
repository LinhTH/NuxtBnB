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
  </div>
</template>

<script>
export default {
  layout: 'red',

  /**
   * This is a special Nuxt hook that runs once server side and then run again client-side when navigating to other routes. Whatever you return from asyncData will be merged with the page's local data object. Nuxt will wait for the response before rendering the page
   * @param params
   * @param $dataApi
   * @returns {Promise<{home: *}>}
   */
  async asyncData({ params, $dataApi, error }) {
    const response = await $dataApi.getHome(params?.id)

    if (!response.ok)
      return error({
        statusCode: response.status,
        message: response.statusText,
      })

    return {
      home: response.json,
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
  head() {
    return {
      title: this.home.title,
    }
  },
}
</script>
