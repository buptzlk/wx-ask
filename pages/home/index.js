//index.js
//获取应用实例
var app = getApp();
Page( {
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  anwser: function (event){
    var value = event.currentTarget.dataset.value;
    console.log('valse :' + value);
    wx.request({
      url: 'https://www.knowalker.com/q/show/' + value,
      method: 'GET',
      data: {
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('question', res.data.data);
        wx.setStorageSync('count', res.data.count)
      }
    })
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  swiperchange: function(e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo( function( userInfo ) {
    //   //更新数据
    //   that.setData( {
    //     userInfo: userInfo,
    //   })
    // })

    //调用登录接口
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res_user) {
            that.globalData.userInfo = res_user.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
            wx.request({
              url: 'https://www.knowalker.com/user/get',
              data: {
                code: res.code,
                encryptedData: res_user.encryptedData,
                iv: res_user.iv
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                var obj = res.data.data[0];
                that.setData({
                  score: obj.score ,
                  grade: obj.grade ,
                  avatar: obj.avatar
                });
              }
            })
          }
        })
      }
    })
    //playingList
    wx.request({
      url: 'https://www.knowalker.com/api/cat',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          items:res.data.data
          })
      }
    })
  },
  globalData: {
    userInfo: null
  },

  
  go: function(event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }

})
