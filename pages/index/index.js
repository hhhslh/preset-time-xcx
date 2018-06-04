//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    timeBox:[],
    showDay: {},
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getDay();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getDay: function () {
    const that = this;
    var res = {
      "code": 100,
      "msg": "处理成功",
      "extend": {
        "dayTimeAllow": [
          {
            "day": "2018-05-18",
            "times": [
              {
                "time": "11:00",
                "allow": 1
              },
              {
                "time": "12:00",
                "allow": 0
              },
              {
                "time": "13:00",
                "allow": 1
              },
              {
                "time": "14:00",
                "allow": 0
              },
              {
                "time": "15:00",
                "allow": 1
              },
              {
                "time": "16:00",
                "allow": 1
              }
            ]
          },
          {
            "day": "2018-05-25",
            "times": [
              {
                "time": "11:00",
                "allow": 0
              },
              {
                "time": "11:00",
                "allow": 1
              },
              {
                "time": "11:00",
                "allow": 0
              },
              {
                "time": "11:00",
                "allow": 1
              },
              {
                "time": "11:00",
                "allow": 1
              },
              {
                "time": "11:00",
                "allow": 1
              }
            ]
          }
        ]
      }
    };
    res.extend.dayTimeAllow.forEach(function (item, index) {
      if(index==0){
        item.selected=true;
      }else{
        item.selected = false;
      }
    })
    that.setData({
      showDay: res,
      timeBox: res.extend.dayTimeAllow[0].times,
    });
  },
  clickDay: function(event){
    var allInfo = this.data.showDay;
    var index = event.currentTarget.dataset.index;
    allInfo.extend.dayTimeAllow.forEach(function(item){
       item.selected=false
    })
    allInfo.extend.dayTimeAllow[index].selected=true;
    this.setData({
      timeBox: allInfo.extend.dayTimeAllow[index].times,
      showDay: allInfo,
    })
  },
  clickTime: function(event){
    var allow = event.currentTarget.dataset.allow;
    var index = event.currentTarget.dataset.index;
      if(allow==1){
        wx.showToast({
          title: '不能选择',
        })
      }else{
        var timeInfo = this.data.timeBox;
        timeInfo[index].allow = 1;
        this.setData({
          timeBox:timeInfo,
        })
      }
  } 
})
