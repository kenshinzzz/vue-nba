'use strict'

import {PLAYER} from '../constant'

const state = {
  isLoaded: false,
  recent: [],
  data: []
}

const getters = {
  playerList: state => state
}

// actions
const actions = {
  [PLAYER.LIST] ({ commit }, action) {
    commit(PLAYER.LIST, action)
  },
  [PLAYER.RECENT] ({ commit }, action) {
    commit(PLAYER.RECENT, action)
  }
}

// mutations
const mutations = {
  [PLAYER.LIST] (state, action) {
    state.isLoaded = true
    state.data = action
  },
  [PLAYER.RECENT] (state, action) {
    state.recent = action
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
