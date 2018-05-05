// pages/score/score.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    source: 'github.com/wangmingjob/weapp-weipiao'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (option) {
    console.log('kkk');
    console.log(option.grade);
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        grade: option.grade
      })
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '专家你来'
    })
  }
})
