'use strict'

import {TEAM} from '../store/constant'
import channel from '../channel'
import store from '../store'

export const getTeamRank = (year, month, date) => {
  if (store.getters.team.loaded) {
    return Promise.resolve()
  }
  return channel.getTeamRank(year, month, date)
    .then(data => {
      store.dispatch(TEAM.RANK, data)
    })
    .catch(err => console.error(err))
}

export const getTeamInfo = (id) => {
  if (store.getters.team.detail[id]) {
    return Promise.resolve()
  }
  return channel.getTeamInfo(id)
    .then(data => {
      store.dispatch(TEAM.INFO, {
        data: data,
        id
      })
    })
    .catch(err => console.error(err))
}

export const getTeamDetail = (id) => {
  if (store.getters.team.detail[id] && store.getters.team.detail[id].players) {
    return Promise.resolve()
  }
  return channel.getTeamDetail(id)
    .then(data => {
      store.dispatch(TEAM.DETAIL, {
        data: data,
        id
      })
    })
    .catch(err => console.error(err))
}

export default {
  getTeamRank,
  getTeamInfo,
  getTeamDetail
}
