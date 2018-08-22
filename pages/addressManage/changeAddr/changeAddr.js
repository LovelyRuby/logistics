//index.js
//获取应用实例
var tcity = require("../../../utils/citys.js");
var dateFormat = require('../../../utils/date.js');
var httpUtils = require('../../../utils/httpUtils.js')
var app = getApp()
Page({
  data: {
    id:-1,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    userName: "",
    phoneNumber: "",
    idCard: "",
    sheng: "",
    shi: "",
    qu: "",
    detail: "",
  },
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
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
      // 获取上个页面的对象
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2] //上一个页面
      // 获取上个页面的全部值
      var userData = prevPage.data.userInfo
      var timestampStr = dateFormat.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
      var id = this.data.id;
      userData[id]["receiverName"] = inputValue.receiverName
      userData[id]["receiverPhone"] = inputValue.receiverPhone
      userData[id]["receiverId"] = inputValue.receiverId
      userData[id]["province"] = this.data.province
      userData[id]["city"] = this.data.city
      userData[id]["county"] = this.data.county
      userData[id]["receiverDetailAddress"] = inputValue.receiverDetailAddress
      userData[id]["timestampStr"] = timestampStr
      prevPage.setData({
        userInfo: userData,
      })
      //       getApp().myShowModal('保存成功')

      //     }
      //   }
      // )
      wx.navigateBack({})
    }
  },
  open: function() {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function(options) {
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
    console.log('三级联动初始化完成');
    var id = decodeURIComponent(options.id)
    this.setData({
      id:id
    })
    // 获取上个页面的对象
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2] //上一个页面
    // 获取上个页面的全部值
    var userData = prevPage.data.userInfo
    // 把要修改的值设置到本页面的data当中
    this.setData({
      userName: userData[id]["receiverName"],
      phoneNumber: userData[id]["receiverPhone"],
      idCard: userData[id]["receiverId"],
      sheng: userData[id]["province"],
      shi: userData[id]["city"],
      qu: userData[id]["county"],
      detail: userData[id]["receiverDetailAddress"]
    })
  }
})