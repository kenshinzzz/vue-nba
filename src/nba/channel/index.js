'use strict'

import address from './address'
import producer from './producer'
import {httpResGet} from '../utils/http-util'

export default {
  getGameGeneral (year, month, date) {
    const url = address.gameGeneral(`${year}${month}${date}`)
    return httpResGet(url)
      .then(data => {
        const allGames = producer.gameGeneral(data)
        /* if (allGames.live.length + allGames.unstart.length + allGames.over.length === 0) {
          return this.getGameGeneral(year, month, parseInt(date, 10) + 1)
        } */
        allGames.gameDate = `${year}-${month}-${date}`
        return allGames
      })
  },

  getGameDetail (year, month, date, gameId) {
    const url = address.gameDetail(`${year}${month}${date}`, gameId)
    return httpResGet(url)
      .then(data => producer.gameDetail(data))
  },

  getLeagueStanding (year) {
    const url = address.leagueStanding(year)
    return httpResGet(url)
      .then(data => producer.leagueStanding(data))
  },

  getPlayerList () {
    const url = address.playerList()
    return httpResGet(url)
      .then(data => producer.playerList(data))
  },

  getPlayerInfo (id) {
    const url = address.playerInfo(id)
    return httpResGet(url)
      .then(data => producer.playerInfo(data))
  },

  getPlayerLog (id) {
    const url = address.playerLog(id)
    return httpResGet(url)
      .then(data => producer.playerLog(data))
  },

  getTeamRank (year, month, date) {
    const url = address.teamRank(`${month}/${date}/${year}`)
    return httpResGet(url)
      .then(data => producer.teamRank(data))
  },

  getTeamInfo (id) {
    const url = address.teamInfo(id)
    return httpResGet(url)
      .then(data => producer.teamInfo(data))
  },

  getTeamDetail (id) {
    /* Get players data and basic info */
    const url = address.teamDetail(id)
    const urlBasic = address.teamDetailBasic(id)
    return Promise.all([
      httpResGet(url)
        .then(data => producer.teamDetail(data)),
      httpResGet(urlBasic)
        .then(data => producer.teamDetailBasic(data))
    ])
      .then(result => {
        const playerData = result[0]
        const playerInfo = result[1]
        return playerData.map(player => {
          return Object.assign({}, player, playerInfo[player.id])
        })
      })
  }
}
