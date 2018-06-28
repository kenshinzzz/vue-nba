'use strict'

const userDefaults = {
  set: (key, value) => {
    const jsonValue = JSON.stringify(value)
    return localStorage.setItem(key, jsonValue)
  },

  get: (key) => {
    let data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    } else {
      return null
    }
  }
}

export default userDefaults
