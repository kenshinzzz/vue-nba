import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './route-config'
import './http-config'
import 'assets/styles/style-common.css'
import 'assets/styles/icon.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
