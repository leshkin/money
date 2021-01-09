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
    start_url: 'https://leshkin.github.io/money',
    themeColor: '#ffffff',
    msTileColor: "#ffffff",
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
}
