import Vue from 'vue'
import {Indicator} from 'mint-ui'
export {httpResGet}

/**
 * 发起HTTP GET请求
 * @param param 请求参数
 * @returns {Promise}
 */
function httpResGet (url, param) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then((response) => {
      let d = response.data
      if (typeof d === 'string') {
        d = JSON.parse(d)
      }
      resolve(d)
      Indicator.close()
    }, (response) => {
      let msg = response.data
      if (msg === undefined || !msg) {
        msg = '网络连接失败，请重试'
      }
      reject(msg)
      Indicator.close()
    })
  })
}
