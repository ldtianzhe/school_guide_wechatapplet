var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var app = getApp()
Page({
  data: {
    distance: '',
    duration: '',
    polyline: [],
    currentLo: '',
    currentLa: ''
  },
  onLoad: function(options) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var Longitude = getApp().longitude;
    var Latitude = getApp().latitude;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            iconPath: "/resource/images/mapicon_navi_s.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 23,
            height: 33
          },
          {
            iconPath: "/resource/images/mapicon_navi_e.png",
            id: 0,
            latitude: Latitude,
            longitude: Longitude,
            width: 24,
            height: 34
          }],
        });
        myAmapFun.getDrivingRoute({
          origin: res.longitude + ',' + res.latitude,
          destination: Longitude + ',' + Latitude,
          success: function (data) {
            console.log(data)
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              var distance = data.paths[0].distance
              if (distance.length < 3) {
                that.setData({
                  distance: '全程' + distance + '米'
                });
              } else {
                that.setData({
                  distance: '全程' + parseFloat(distance / 1000).toFixed(1) + '公里'
                });
              }
            }
            if (data.paths[0] && data.paths[0].duration) {
              var duration = data.paths[0].duration
              if (duration.length < 2) {
                that.setData({
                  duration: '大约需要' + parseInt(duration / 60) + '分钟'
                });
              } else {
                that.setData({
                  duration: '大约需要' + ((Math.floor(duration / 60 / 60)).toString().length < 2 ? (Math.floor(duration / 60 / 60)).toString() :
                    (Math.floor(duration / 60 / 60)).toString()) + "小时" + (parseInt(duration / 60 % 60).toString().length < 2 ? parseInt(duration / 60 % 60).toString() : parseInt(duration / 60 % 60).toString()) + '分钟'
                });
              }
            }
          }
        })
      },
    })
    
    
  },
  onReady: function(){
    // console.log(this.data.distance + '..'+this.data.cost)
  },
  
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  },
  nav: function () {
    var Longitude = parseFloat(getApp().longitude);
    var Latitude = parseFloat(getApp().latitude);
    var Name = getApp().name;
    wx.openLocation({
      latitude: Latitude,
      longitude: Longitude,
      name: Name
    })
  }
})