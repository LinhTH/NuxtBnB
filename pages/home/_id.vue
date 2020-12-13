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
import homes from '~/data/homes.json'

if (process.client) {
  window.initMap = function () {
    console.log(test)
  }
}

export default {
  layout: 'red',
  data() {
    return {
      home: {},
    }
  },
  // In Nuxt, the method is ran on both the server and on the client on the first page view
  created() {
    this.home = homes.find((home) => home.objectID === this.$route?.params?.id)
  },
  mounted() {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(
        this.home._geoloc.lat,
        this.home._geoloc.lng
      ),
    }
    const map = new window.google.maps.Map(this.$refs.map, mapOptions)
    const position = new window.google.maps.LatLng(
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
    const marker = new window.google.maps.Marker({
      position,
    })
    marker.setMap(map)
  },
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsKXrZB1kSA-Xw4FqmqhDNNHhP__Homtw&libraries=places&callback=initMap',
          hid: 'map',
          defer: true,
          skip: process.client && window.mapLoaded, // Skip to avoid the error: you have included the Google Maps Javascript multiple times on this page
        },
        {
          innerHTML: 'window.initMap = function() { window.mapLoaded = true }',
          hid: 'map-init',
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'map-init': ['innerHTML'],
      },
    }
  },
}
</script>
