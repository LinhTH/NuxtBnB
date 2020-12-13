/**
 * @param _context: contains a ton of internal objects such as Vuex store, Router, the Root Vue instance
 * @param inject: injects an object or value into your app that's available throughout Vue and Vuex
 * IMPORTANT: always declare the plugin in nuxt.config.js
 */
export default function (_context, inject) {
  let mapLoaded = false
  let mapWaiting = null

  addScript()

  /**
   * Inject takes two parameters. The first one is the name of what you are injecting. In the property page it is referred by this.$<name>
   * The seconf parameter is the object or value you want to be returned.
   */
  inject('maps', {
    showMap,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsKXrZB1kSA-Xw4FqmqhDNNHhP__Homtw&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap // As Google Map needs a global function to call
    document.head.appendChild(script)
  }

  function initMap() {
    mapLoaded = true
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  function showMap(canvas, lat, lng) {
    if (mapLoaded) {
      renderMap(canvas, lat, lng)
    } else {
      mapWaiting = { canvas, lat, lng }
    }
  }
  function renderMap(canvas, lat, lng) {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({
      position,
    })
    marker.setMap(map)
  }
}
