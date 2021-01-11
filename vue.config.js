module.exports = {
  publicPath: '/money/',
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
  },
  pwa: {
    name: 'Money Split',
    themeColor: '#000000',
    msTileColor: "#000000",
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
}
