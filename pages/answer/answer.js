// pages/answer/answer.js
var index = 0;
// 总条目
var count = 0;
// 总得分
var grade = parseInt(0);
// 正确答案
var result ;
//每道题的分数
var score = 0;
//记录用户答题记录
var arr = {};
//题目id
var questionId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    A:'A',
    B:'B',
    C:'C',
    D:'D',
    chosen:'E',
    isAnswerRight: true 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    grade = option.grade;
    count = wx.getStorageSync('count');
    if (wx.getStorageSync('index') > 0) {
      index = wx.getStorageSync('index');
    } 
    if (index > count || index == count) {
      index = 0;
    }
    var items = wx.getStorageSync('question')
    var options = items[index].options
    var obj = JSON.parse(options)
    result = JSON.parse(items[index].result)[0]
    score = items[index].score
    questionId = items[index].id
    this.setData({
      title: items[index].title,
      A: obj.A,
      B: obj.B,
      C: obj.C,
      D: obj.D,
      num:index+1
    });   
  },
  answerNext: function (event) {
    var that = this;
    var value = event.currentTarget.dataset.value;
    this.setData({
      chosen: value
    })
    console.log('index dianji hou :'+index);
    arr[questionId] = value;
    if (index + 1 < count) {
      if (value == result) {
        grade = parseInt(grade) + parseInt(score);
        console.log('grade')
        console.log(grade)
        this.setData({
          isAnswerRight: true
        })  
      } else {
        grade = parseInt(grade) + 0;
        this.setData({
          isAnswerRight: false
        })
      }
      wx.setStorageSync('index', index + 1);
      setTimeout(function () {
        wx.redirectTo({
          url: '../answer/answer?grade=' + grade
        })
      }.bind(this), 500);
      
    } else {
      index = 0;
      wx.removeStorageSync('index');
      if (value == result) {
        console.log('grade')
        console.log(grade)
        grade = parseInt(grade) + parseInt(score);
        console.log(grade)
        this.setData({
          isAnswerRight : true
        })  
      } else {
        grade = parseInt(grade) + 0;
        this.setData({
          isAnswerRight : false
        })  
      }
      //答题完毕上传分数 和题目答案
    //   wx.request({
    //     url: 'https://www.knowalker.com/user/addScore',
    //     method: 'GET',
    //     data: {
    //       score : grade,
    //       openId : wx.getStorageSync('openId'),
    //       question: JSON.stringify(arr)
    //     },
    //     header: {
    //       'Accept': 'application/json'
    //     },
    //     success: function (res) {
    //       console.log('shan')
    //       console.log(res)
    //     }
    //  })
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res_user) {
              that.globalData.userInfo = res_user.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: 'https://www.knowalker.com/user/addScore',
                data: {
                  code: res.code,
                  encryptedData: res_user.encryptedData,
                  iv: res_user.iv,
                  score: grade,
                  question: JSON.stringify(arr)
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                }
              })
            }
          })
        }
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../score/score?grade=' + grade,
        })
       }.bind(this), 500);
      
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
    wx.removeStorageSync('question');
    wx.removeStorageSync('index');
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
  
  globalData: {
    userInfo: null
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})