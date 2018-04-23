// pages/answer/answer.js
var index = 0;
var count = 2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    A:'A',
    B:'B',
    C:'C',
    D:'D'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('index   :'+index);
    if (wx.getStorageSync('index') > 0) {
      console.log('>0' );
      index = wx.getStorageSync('index');
    } 
    if (index > count || index == count) {
      index = 0;
    }
    var items = wx.getStorageSync('question')
    var options = items[index].options
    var obj = JSON.parse(options)
   
    this.setData({
      title: items[index].title,
      answer: items[index].result,
      A: obj.A,
      B: obj.B,
      C: obj.C,
      D: obj.D,
      num:index+1
    });   
  },
  answerNext: function () {
    console.log('index dianji hou :'+index);
    if (index + 1 < count) {
      wx.setStorageSync('index', index + 1);
      wx.redirectTo({
        url: '../answer/answer'
      })
    } else {
      index = 0;
      wx.removeStorageSync('index');
      console.log(wx.getStorageSync('index'))
      wx.redirectTo({
        url: '../score/score',
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})