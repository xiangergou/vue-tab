import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Element from 'element-ui'
import '@/assets/css/element-variables.scss'
import waves from '@/directive/waves'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: 'static/loading.jpeg',
  attempt: 1
})

Vue.use(waves)
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
