var httpUtils = require('../../utils/httpUtils.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    userInfo: [{
      receiverName: "张三",
      receiverPhone: "15827646221",
      receiverId: "420114199605030054",
      province: "湖北省",
      city: "武汉市",
      county: "硚口区",
      receiverDetailAddress: "百姓之春"
    }, {
      receiverName: "张三",
      receiverPhone: "15827646221",
      receiverId: "420114199605030054",
      province: "湖北省",
      city: "武汉市",
      county: "硚口区",
      receiverDetailAddress: "百姓之春"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // httpUtils.httpRequest(
    // 'erp.api.user.findOneUser'
    // , {
    // 查询条件
    // unionid: getApp().globalData.userInfo.unionId,
    // receiverName: 'name'
    // }
    // , (res) => {
    // console.log(res)
    if (true) {
      console.log("onload触发了")
      // if ('1' == res.success) {  
      // 查询成功拿到用户信息
      // app.globalData.userInfo = res.list
      // var user = res.list
      // 将用户信息设置到data当中方便页面循环拿值
      // this.setData({
      //  userInfo:user
      // })
    }
    // httpUtils.httpRequest(
    //   'erp.api.user.findOneUser'
    //   , {
    //     // 查询条件
    //     // unionid: getApp().globalData.userInfo.unionId,
    //     receiverName: 'name'
    //   }

    //   , (res) => {
    //     console.log(res)
    //     if ('1' == res.success) {
    //       this.data.array = res.list
    //       this.setData({
    //         array: this.data.array
    //       })
    //     }else{
    //       this.setData({
    //         query: 'hide'
    //       })
    //     }
    //   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onshow触发了")
    var len = this.data.userInfo.length
    if (len == 0) {
      this.setData({
        query: ""
      })
    } else {
      this.setData({
        query: "hide"
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addAddr: function() {
    wx.navigateTo({
      url: 'addAddr/addAddr',
    })
  },
  change: function(e) {
    var excIndex = e.currentTarget.id
    console.log(excIndex)
    wx.navigateTo({
      url: 'changeAddr/changeAddr?id=' + excIndex,
    })
  },
  del: function(e) {
    var that = this
    wx.showModal({
      content: '确认删除该条地址吗？',
      confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          // 调接口然后对本地数据进行修改。
          var excIndex = e.currentTarget.id
          console.log("索引为"+excIndex)
          var user = that.data.userInfo
          console.log("原长度为" + user.length)
          user.splice(excIndex, 1)
          var len = user.length
          if (len == 0) {
            that.setData({
              userInfo: user,
              query: ""
            })
          } else {
            that.setData({
              userInfo: user,
              query: "hide"
            })
          }
        }
      }
    })
  }
})