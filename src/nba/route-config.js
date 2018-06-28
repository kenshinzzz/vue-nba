import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
import * as index from './index/router'

let routes = []
const registerRoute = (config) => {
  let pre = config.pre
  let path = config.path
  for (var obj of config.list) {
    if (obj.name && pre) {
      obj.name = `${pre}-${obj.name}`
    }
    obj.path = `${path}${obj.path}`
    routes.push(obj)
  }
}

function registerRoutes (...route) {
  for (let i = 0, len = route.length; i < len; i++) {
    registerRoute(route[i])
  }
  return routes
}

function nextTo (to, from, next, store) {
  if (from.path !== '/') {
    if (from.meta.keepAlive && to.meta.keepAlive !== true) {
      store.dispatch('setChgKeepAlive', 'nk')
    } else if (to.meta.keepAlive && from.meta.keepAlive !== true) {
      store.dispatch('setChgKeepAlive', 'k')
    } else {
      store.dispatch('setChgKeepAlive', 'nc')
    }
  }
  Vue.nextTick(function () {
    next()
  })
}

function initRouter (store, routes) {
  let router = new VueRouter({
    mode: 'hash',
    routes,
    scrollBehavior (to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    }
  })
  router.beforeEach((to, from, next) => {
    nextTo(to, from, next, store)
  })
  Vue.use(VueRouter)
  return router
}

registerRoutes(index.routes)
routes.push(
  {
    path: '*',
    redirect: '/index'
  }
)
const router = initRouter(store, routes)

export default router