module.exports = {
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Formation Node.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Formation Node.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/github.min.css' }
    ],
    script: [
      { src: 'https://embed.runkit.com/' }
    ]
  },
  plugins: ['~/plugins/highlight.js'],
  css: ['~/assets/style/main.css'],
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    treeShake: true,
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize the base url
  */
  router: { base: '/nodejs-training/', mode: 'hash' },
  /**
   * Generation route
   */
  generate: { dir: 'public' },

  /*
  ** Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  */
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ]
}
