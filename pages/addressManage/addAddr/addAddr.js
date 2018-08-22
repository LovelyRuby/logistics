//index.js
//获取应用实例
var tcity = require("../../../utils/citys.js");
var dateFormat = require('../../../utils/date.js');
var httpUtils = require('../../../utils/httpUtils.js')
var app = getApp()
Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
  },
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0],
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  // nosave:function(){
  //   console.log("返回");
  //   wx.navigateBack({
  //     url: '../addr',
  //   })
  // },
  finish: function(e) {
    var inputValue = e.detail.value
    if ('' == inputValue.receiverName) {
      getApp().myShowModal('请输入收件人姓名')
    } else if ('' == inputValue.receiverPhone) {
      getApp().myShowModal('请输入收件人手机号')
    } else if ('' == inputValue.receiverId) {
      getApp().myShowModal('请输入收件人身份证号')
    } else if ('' == inputValue.receiverDetailAddress) {
      getApp().myShowModal('请选择输入详细地址(详细到门牌)')
    } else {
      var timestampStr = dateFormat.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
      // 把值设置到一个json数据中
      var obj = {}
      obj.receiverName = inputValue.receiverName
      obj.receiverPhone = inputValue.receiverPhone
      obj.receiverId = inputValue.receiverId
      obj.province = this.data.province
      obj.city = this.data.city
      obj.county = this.data.county
      obj.receiverDetailAddress = inputValue.receiverDetailAddress
      obj.timestampStr = timestampStr
      console.log("准备跳转" + obj)
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2] //上一个页面
      // 获取上个页面的全部值
      var userData = prevPage.data.userInfo
      var new_userData = userData.push(obj)
      console.log("数据为")
      console.log(userData)
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        userInfo: userData,
      })
      wx.navigateBack({


      })
      // httpUtils.httpRequest(
      //   'erp.api.common.insertAddress'
      //   , {
      //     receiverName: this.data.userInfo.receiverName,
      //     receiverPhone: this.data.userInfo.receiverPhone,
      //     receiverId: this.data.userInfo.receiverId,
      //     province: this.data.userInfo.province,
      //     city: this.data.userInfo.city,
      //     county: this.data.userInfo.county,
      //     receiverDetailAddress: this.data.receiverDetailAddress,
      //     createDate: timestampStr
      //   }

      //   , (res) => {
      //     if ('1' == res.success) {
      //       getApp().myShowModal('保存成功')
      //     }
      //   }
      // )
    }
  },
  open: function() {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function() {
    console.log("onLoad");
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
  }
})