// 封装ajax请求
import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
    // 在外部有封装了一个promise对象
  return new Promise(function (resolve, reject) {
    // 定义一个promise对象
    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
    //   Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        //   这局话的意思是从零开始检索到&结束然后复制这段字符串
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        // 拼接字符串行程get请求中的参数
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }

    promise.then(response => {
        // 成功了调用resolve函数
        // 最终向外部暴露的是response.data数据
      resolve(response.data)
    })
      .catch(error => {
        //   失败了返回错误信息
        reject(error)
      })
  })
}
