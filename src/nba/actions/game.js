'use strict'

import channel from '../channel'
import { GAME } from '../store/constant'
import store from '../store'

/**
 * Get info of game general
 */
const getGameGeneral = (year, month, date) => {
  // return (dispatch, getStore) => {
    // if (getStore().application.navigator === 'gameIndex') {
  return channel.getGameGeneral(year, month, date)
    .then(data => {
      store.dispatch(GAME.INFO, data)
    })
    // } else {
    //   return Promise.resolve()
    // }
  // }
}

/**
 * Grab detail of each game
 * @params id {String} && type {String}
 * @note id = game_id & tye = game_type
 * @return game {Object}
 */
const getGameDetail = (id, type, year, month, date) => {
  // return (dispatch, getStore) => {
  //   if (getStore().application.navigator === 'gameDetail') {
      /* If the game is finish and have detail data, no need to request again */
  if (type === 'over') {
    const game = store.getters.over.find((g) => { return g.id === id })
    if (game.detail && game.detail.loaded) {
      // store.dispatch(GAME.DETAIL, game.detail.data)
      return Promise.resolve()
    }
  }
  return channel.getGameDetail(year, month, date, id)
    .then(data => {
      let d = {
        gameId: id,
        gameType: type,
        data
      }
      store.dispatch(GAME.DETAIL, d)
    })
    // } else {
    //   return Promise.resolve()
    // }
  // }
}

/**
 * Get every team's standing
 */
const getLeagueStanding = () => {
  if (store.getters.standing.loaded) {
    return Promise.resolve()
  }
  const d = new Date()
  const currentMonth = d.getMonth() + 1
  let year
  if (currentMonth >= 10) {
    year = d.getFullYear().toString()
  } else {
    year = d.getFullYear().toString() - 1
  }
  return channel.getLeagueStanding(year)
    .then(data => {
      store.dispatch(GAME.STANDING, data)
    })
}

export default {
  getGameGeneral,
  getGameDetail,
  getLeagueStanding
}
