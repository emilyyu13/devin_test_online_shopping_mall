export default {
  // Global page headers
  head: {
    title: 'Online Shopping Mall',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Online Shopping Mall with Order System' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/cart-init.js'
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxt/typescript-build'
  ],

  // Modules
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://localhost:3000/api'
  },

  // Build Configuration
  build: {}
}
