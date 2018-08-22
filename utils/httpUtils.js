var dateFormat = require('date.js')

const httpRequest = (method, requestObj, callback, isNotShowLoading, isNotShowError) => {
  if (!isNotShowLoading) {
    wx.showLoading({
      title: '正在加载...'
      , mask: true
    })
  }

  var requestJsonStr = JSON.stringify(requestObj)

  var timestampStr = dateFormat.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')

  var headObj = {
    'appName': 'bt'
    , 'charset': 'UTF-8'
    , 'method': method
    , 'timestamp': timestampStr
  }

  var bodyStr = "head=" + JSON.stringify(headObj) + "&request=" + requestJsonStr

  wx.request({
    // url: 'http://192.168.2.183:8080/track/getcast'
    url: 'http://123.56.26.32:8080/getcast'
    // url: 'https://www.tracking56.com/getcast'
    , data: bodyStr
    , header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    , method: 'POST'
    , dataType: 'json'
    , responseType: 'text'
    , success: (response) => {
      console.log(response)
      var success = response.data.success

      if ('1' == success) {
        callback(response.data)
      } else {
        if (!isNotShowError) {
          getApp().myShowModal('请求失败，' + response.data.errorMsg)
        } else {
          callback(response.data)
        }
      }
    }
    , fail: (error) => {
      callback('-1')

      console.log(error)
    }
    , complete: (res) => {
      if (!isNotShowLoading) {
        wx.hideLoading()
      }
    }
  })
}

module.exports = {
  httpRequest: httpRequest
}
