import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 10000
Vue.http.options.xhr = { withCredentials: true }
Vue.requests = []
Vue.http.interceptors.push((request, next) => {
  // TODO
  next()
})
