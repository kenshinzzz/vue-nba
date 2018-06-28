'use strict'

import { PLAYER } from '../store/constant'
import channel from '../channel'
import store from '../store'
import userDefaults from '../utils/userDefaults'

const getPlayerList = () => {
  if (store.getters.playerList.isLoaded) {
    return Promise.resolve()
  }
  return channel.getPlayerList()
    .then(data => {
      store.dispatch(PLAYER.LIST, data)
    })
    .catch(err => console.error(err))
}

const setSearchRecord = player => {
  let recent = userDefaults.get(PLAYER.RECENT)
  let originData = []
  if (recent) {
    originData = Object.assign([], recent)
  }
  /* If recent record has player, return */
  if (originData.find((data, index) => {
    return data.id === player.id
  })) {
    return Promise.resolve()
  }

  if (originData.length === 10) {
    originData.pop()
  }
  originData.unshift(player)
  userDefaults.set(PLAYER.RECENT, originData)
  store.dispatch(PLAYER.RECENT, originData)
}

const getSearchRecord = id => {
  let recent = userDefaults.get(PLAYER.RECENT)
  let originData = []
  if (recent) {
    originData = Object.assign([], recent)
  }
  store.dispatch(PLAYER.RECENT, originData)
}

const getPlayerDetail = id => {
  if (store.getters.playerLoaded[id]) {
    return Promise.resolve()
  }
  return channel.getPlayerInfo(id)
    .then(data => {
      store.dispatch(PLAYER.DETAIL, {data, id})
    })
    .catch(err => console.error(err))
}

const getPlayerLog = id => {
  if (store.getters.playerLoaded[id] && store.getters.playerLoaded[id].log) {
    return Promise.resolve()
  }
  return channel.getPlayerLog(id)
    .then(data => {
      store.dispatch(PLAYER.LOG, {data, id})
    })
    .catch(err => console.error(err))
}

export default {
  getPlayerList,
  setSearchRecord,
  getSearchRecord,
  getPlayerDetail,
  getPlayerLog
}
