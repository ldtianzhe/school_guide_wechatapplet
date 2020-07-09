// pages/lbsDetail/lbsDetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    title: '',
    description: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var api = app.golbalData.api;
    let id = options.id;//接收标记点的id
    //console.log(id);
    //通过标记点id来查询map表获取标记点信息
    wx.request({
      url: api+'/app/getMapById?id=' + id,
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //console.log(res)
        var images = res.data.images.split(',');
        that.setData({
          title: res.data.title,
          description: res.data.description,
          imgUrls: images,
          latitude: res.data.latitude,
          longitude: res.data.longitude
        })
      }
    })
  },

  tiaozhuan: function (e) {
    //console.log(e)
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var name = this.data.title;
    // console.log(Longitude,Latitude,Name)
    app.longitude = longitude;
    app.latitude = latitude;
    app.name = name;
    wx.navigateTo({
      url: '/pages/navigation_walk/navigation'
    })
  },
  // tiaozhuan: function(e){
  //   let plugin = requirePlugin('routePlan');
  //   let key = 'L6XBZ-7UPY6-XHQS7-MZU6P-X6OFF-BVBOB';  //使用在腾讯位置服务申请的key
  //   let referer = '信农校园游览';   //调用插件的app的名称
  //   let endPoint = JSON.stringify({  //终点
  //     'name': this.data.title,
  //     'latitude': this.data.latitude,
  //     'longitude': this.data.longitude
  //   });
  //   wx.navigateTo({
  //     url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
  //   });
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})