import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import standing from './modules/standing'
import playerList from './modules/playerList'
import playerLoaded from './modules/playerLoaded'
import team from './modules/team'
import base from './modules/base'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    game, standing, playerList, playerLoaded, team, base
  },
  strict: debug
})
