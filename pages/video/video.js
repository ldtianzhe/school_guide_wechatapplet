// pages/video/video.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navideo: [],
    video: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      duration: 1000,
      mask: true,
      icon: 'loading'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var api = app.golbalData.api;
    wx.getStorage({
      key: 'video',
      success: function (res) {
        console.log(res.data)
        var shuju = res.data
        //更新数据
        that.setData({
          video: shuju
        })
        console.log('使用了本地缓存');
      },
      fail: function () {
        console.log('没有使用本地缓存');
        //操作video表
        wx.request({
          url: api+'/app/video',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            that.setData({
              navideo: res.data.navideo,
              video: res.data.video
            })

          },fail(){

          }
        })
      }
    })

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