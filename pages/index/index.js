const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: '',
    jianjie: '',
    video: '',
    youlan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var api = app.golbalData.api;
    wx.request({
      url: api+'/app/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data
        var background;
        var jianjie;
        var video;
        var youlan;
        data.forEach((item) =>{
          if(item.keyName=="background"){
            background = item.value
          } else if (item.keyName == "jianjie"){
            jianjie = item.value
          } else if (item.keyName == "video"){
            video = item.value
          } else if (item.keyName == "youlan"){
            youlan = item.value
          }
        })
        that.setData({
          background: background,
          jianjie: jianjie,
          video: video,
          youlan: youlan
        })
      }
    })

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