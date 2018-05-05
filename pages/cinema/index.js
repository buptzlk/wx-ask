var app = getApp()
Page({
    data: {
        title: ''
    },
    //事件处理函数
    onLoad: function (options) {
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })

        //playingList
        wx.request({
           url: 'https://www.knowalker.com/user/scorelist',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              // var obj = res.data.data[0]
                console.log(res.data)
                that.setData({ items: res.data.data })
            }
        })
    },
    onShow:function() {
      var that = this
      wx.request({
        url: 'https://www.knowalker.com/user/scorelist',
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          // var obj = res.data.data[0]
          console.log('res.data')
          console.log(res.data)
          that.setData({ items: res.data.data })
        }
      })
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '专家你来'
        })
    },
})
