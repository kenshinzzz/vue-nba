/**
 * Team rank
 */

'use strict'

import Vue from 'vue'
import {TEAM} from '../constant'

const state = {
  loaded: false,
  data: {
    eastern: [
      // {id, abbre, standing}
    ],
    western: []
  },
  detail: {}
}

const getters = {
  team: state => state
}

// actions
const actions = {
  [TEAM.RANK] ({ commit }, action) {
    commit(TEAM.RANK, action)
  },
  [TEAM.INFO] ({ commit }, action) {
    commit(TEAM.INFO, action)
  },
  [TEAM.DETAIL] ({ commit }, action) {
    commit(TEAM.DETAIL, action)
  }
}

// mutations
const mutations = {
  [TEAM.RANK] (state, action) {
    state.loaded = true
    state.data = action
  },
  [TEAM.INFO] (state, action) {
    Vue.set(state.detail, action.id, action.data)
  },
  [TEAM.DETAIL] (state, action) {
    if (!state.detail[action.id]) {
      Vue.set(state.detail, action.id, {})
    }
    Vue.set(state.detail[action.id], 'players', action.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
