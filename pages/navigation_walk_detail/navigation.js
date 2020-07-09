var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function() {
    var that = this;
    var Longitude = getApp().longitude;
    var Latitude = getApp().latitude;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        myAmapFun.getWalkingRoute({
          origin: res.longitude + ',' + res.latitude,
          destination: Longitude + ',' + Latitude,
          success: function (data) {
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              that.setData({
                steps: data.paths[0].steps
              });
            }

          },
          fail: function (info) {

          }
        })
      },
    })
    
  }
})