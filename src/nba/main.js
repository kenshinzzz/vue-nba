import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import store from './store/index'
import router from './route-config'
import 'assets/styles/style-common.css'
import 'assets/styles/icon.css'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 10000 // TODO
Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {
  next()
})

Vue.config.lang = 'zh-CN'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
