//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.getUserInfo({
            success: function (res_user) {
              that.globalData.userInfo = res_user.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: 'https://www.knowalker.com/api/user/login',
                data: {
                  code: res.code,
                  encryptedData:res_user.encryptedData,
                  iv: res_user.iv
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.setStorageSync('openId', res.data.openId);
                  wx.setStorageSync('score', res.data.score);
                  console.log(res)
                }
              })
            }
          })
        }
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    userInfo:null
  }
})