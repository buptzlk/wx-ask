// pages/answer/answer.js
// 题目
var items = new Array();
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
// 是否需要清空
var isclear = true;
var catId ;
var lastCatId;
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
    var that = this;
    var length = 0;
    grade = option.grade;
    catId = option.catId;
    //先判断有无数据 没有肯定是第一次进来 有的话再判断是否同一个题目类别下的题目列表
    if (items == null) {
      length = 0;
    } else {
      // 两次catId一样就是在刷新同一页面 否则就是其他类别题目进来的 所以重置
      if (lastCatId == catId) {
        length = items.length;
      } else {
        length = 0;
        wx.removeStorageSync('index');
        index = 0;
      }
     
    }
  
    if (length == null || length <= 0) {
      lastCatId = catId;
      wx.request({
        url: 'https://www.knowalker.com/q/show/' + catId,
        method: 'GET',
        data: {
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          items = res.data.data
          console.log(items)
          count = res.data.count;
          if (wx.getStorageSync('index') > 0) {
            index = wx.getStorageSync('index');
          }
          if (index > count || index == count) {
            index = 0;
          }
          var options = items[index].options;
          var obj = JSON.parse(options);
          result = JSON.parse(items[index].result)[0];
          score = items[index].score;
          questionId = items[index].id;
          that.setData({
            title: items[index].title,
            A: obj.A,
            B: obj.B,
            C: obj.C,
            D: obj.D,
            num: index + 1
          });
        }
      })
    } else {
      if (wx.getStorageSync('index') > 0) {
        index = wx.getStorageSync('index');
      }
      if (index > count || index == count) {
        index = 0;
      }
      console.log('else index');
      console.log(index);
      var options = items[index].options;
      var obj = JSON.parse(options);
      result = JSON.parse(items[index].result)[0];
      score = items[index].score;
      questionId = items[index].id;
      that.setData({
        title: items[index].title,
        A: obj.A,
        B: obj.B,
        C: obj.C,
        D: obj.D,
        num: index + 1
      });
    }
  },

  // 点击选项
  answerNext: function (event) {
    var that = this;
    var value = event.currentTarget.dataset.value;
    this.setData({
      chosen: value
    })
    console.log('index dianji hou :'+index);
    arr[questionId] = value;
    if (index + 1 < count) {
      isclear = false;
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
          url: '../answer/answer?grade=' + grade + '&catId=' + catId
        })
      }.bind(this), 500);
      
    } else {
      isclear = true;
      index = 0;
      items.splice(0, items.length);
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
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
    if (isclear) {
      wx.removeStorageSync('index');
      items.splice(0, items.length);
      items = null;
    }
    
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