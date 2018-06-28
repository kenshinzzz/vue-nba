'use strict'
import {GAME} from '../constant'

const state = {
  gameDate: '',
  live: [],
  over: [],
  unstart: []
    /* [
      {
        id: {Number}
        type: {String}
        home: {
          team: {String}
          score: {String}
        },
        visitor: {
          team: {String}
          score: {String}
        },
        detail: {
          url: {String}
          loaded: {Bool}
          data: {Object}
        }
      }
  ] */
}

const getters = {
  unstart: state => state.unstart ? state.unstart : [],
  over: state => state.over ? state.over : [],
  live: state => state.live ? state.live : []
}

// actions
const actions = {
  [GAME.INFO] ({ commit, state }, action) {
    commit(GAME.INFO, action)
  },

  [GAME.DETAIL] ({ state, commit }, action) {
    commit(GAME.DETAIL, action)
  }
}

// mutations
const mutations = {
  [GAME.INFO] (state, action) {
    Object.assign(state, action)
  },

  [GAME.DETAIL] (state, action) {
    // if (action.gameType !== 'over') {
    //   return state
    // }
    if (action.gameType === 'over') {
      state.over.some(game => {
        if (game.id === action.gameId) {
          if (!game.detail.loaded) {
            game.detail = game.detail || {}
            game.detail.loaded = true
            game.detail.data = action.data
          }
          return true
        }
        return false
      })
    } else {
      state.live.some(game => {
        if (game.id === action.gameId) {
          game.detail = game.detail || {}
          game.detail.loaded = true
          game.detail.data = action.data
          return true
        }
        return false
      })
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
