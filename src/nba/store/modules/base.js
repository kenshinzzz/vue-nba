'use strict'

const state = {
  chgKeepAlive: ''
}

const getters = {
  chgKeepAlive: state => state.chgKeepAlive
}

// actions
const actions = {
  setChgKeepAlive ({commit}, action) {
    commit('setChgKeepAlive', action)
  }
}

// mutations
const mutations = {
  setChgKeepAlive (state, action) {
    state.chgKeepAlive = action
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
