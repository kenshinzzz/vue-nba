'use strict'

import channel from '../channel'
import { GAME } from '../store/constant'
import store from '../store'

/**
 * Get info of game general
 */
const getGameGeneral = (year, month, date) => {
  return new Promise((resolve, reject) => {
    channel.getGameGeneral(year, month, date)
      .then(data => {
        if (data) {
          store.dispatch(GAME.INFO, data)
          resolve()
        } else {
          reject()
        }
      })
  })
}

/**
 * Grab detail of each game
 * @params id {String} && type {String}
 * @note id = game_id & tye = game_type
 * @return game {Object}
 */
const getGameDetail = (id, type, year, month, date) => {
  if (type === 'over') {
    const game = store.getters.over.find((g) => { return g.id === id })
    if (game.detail && game.detail.loaded) {
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
