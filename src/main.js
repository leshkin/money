import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import 'bulma/css/bulma.min.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueI18n)

const router = new VueRouter({
  routes: [
    { path: '/', component: App }
  ]
})

const i18n = new VueI18n({
  locale: 'en'
})

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
