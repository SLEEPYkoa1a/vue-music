import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'


fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/koala-logo.png')
})

new Vue({
  el: "#app",
  render: h => h(App),
  store,
  router
})
