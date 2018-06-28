'use strict'

import Vue from 'vue'
import {PLAYER} from '../constant'

const state = {
  // id: {isLogLoaded, log, ...}
}

const getters = {
  playerLoaded: state => state
}

// actions
const actions = {
  [PLAYER.DETAIL] ({ commit }, action) {
    commit(PLAYER.DETAIL, action)
  },
  [PLAYER.LOG] ({ commit }, action) {
    commit(PLAYER.LOG, action)
  }
}

// mutations
const mutations = {
  [PLAYER.DETAIL] (state, action) {
    const data = state[action.id] ? Object.assign(state[action.id], action.data) : action.data
    // state[action.id] = data
    Vue.set(state, action.id, data)
  },
  [PLAYER.LOG] (state, action) {
    // const actionData = {
    //   log: action.data
    // }
    // const data = state[action.id] ? Object.assign(state[action.id], actionData) : actionData
    // state[action.id] = data
    Vue.set(state[action.id], 'log', action.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
