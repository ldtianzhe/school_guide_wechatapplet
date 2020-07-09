var WxParse = require("../../utils/wxParse/wxParse.js")
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    schoolName:'',
    englishName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var api = app.golbalData.api;
    wx.getStorage({
      key: 'schoolData',
      success: function (res) {
        //console.log('使用了本地缓存');
        //更新校园简介数据
        getData(res)
      },fail:function(){
          //console.log('没有使用本地缓存');
          wx.request({
            url: api+'/app/schoolinfo',
           header: {
             'content-type': 'application/json' // 默认值
          },
          success(res) {
            getData(res)
            //将校园简介数据进行本地缓存
            wx.setStorage({
              key: "schoolData",
              data: res.data
            })
          }
        })
      }
    })
    function getData(res){
      var schoolname;
      var englishname;
      var imgUrls;
      var data = res.data;
      data.forEach((item) => {
        if (item.schoolname == "信阳农林学院") {
          schoolname = item.schoolname;
          englishname = item.englishname;
          imgUrls = item.images;
        }
      })
      var images = imgUrls.split(',');
      that.setData({
        schoolName: schoolname,
        englishName: englishname,
        imgUrls: images
      })
    }
    wx.getStorage({
      key: 'content',
      success: function(res) {
        getContent(res)
      },fail: function(){
        wx.request({
          url: api+'/app/content',
          method: 'post',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            "title": "信阳农林学院"
          },
          success(res) {
            getContent(res);
          }
        })
      }
    })
    function getContent(res){
      var data = res.data
      var content;
      data.forEach((item) => {
        if (item.title == "信阳农林学院简介") {
          content = item.content;
        }
      })
      wx.setStorage({
        key: 'content',
        data: data,
      })
      WxParse.wxParse('content', 'html', content, that);
    }
    
  },
  anniu(){
    wx.navigateTo({
      url: '/pages/panoramic_map/panoramic_map',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})