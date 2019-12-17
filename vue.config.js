process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './public/service-worker.js'
    },
  },
    configureWebpack:{
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        }
      }
    }
  }