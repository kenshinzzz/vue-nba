/**
 * Record each team's standing
 */

'use strict'

import {GAME} from '../constant'

const state = {
  loaded: false,
  data: {
    // teamId: {
    //   abbr: {String}
    //   state: {Object}
    // }
  }
}

const getters = {
  standing: state => state
}

// actions
const actions = {
  [GAME.STANDING] ({ commit }, action) {
    commit(GAME.STANDING, action)
  }
}

// mutations
const mutations = {
  [GAME.STANDING] (state, action) {
    state.loaded = true
    state.data = action
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
