export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'NuxtBnB: %s', // Build dynamic title, %s is replaced by the title value of each page opened
    // htmlAttrs: { lang: "end" }, // add a lang attr to the html tag
    // bodyAttrs: { class: ['style'] } // add a class to the body tag
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // {
    //   src: '~/plugins/maps.client.js',
    //   mode: 'client',
    // },
    '~/plugins/maps.client.js', // -> because the name contains 'client' so we do not need to declare explicitly mode: 'client'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // Although the automatic component scan is helpful but it is not clear and the IDE can not detect the tag without explicit import,
  // components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
