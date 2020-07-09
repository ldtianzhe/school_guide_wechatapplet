// pages/youlan/youlan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategory:'',//当前激活的分类
    categoryData: '',
    coreLongitude: '114.124495',
    coreLatitude: '32.161568',
    scale: 16,
    markers: [],
    isSpread: true,
    scrollLeft: 0,
    intoview: '',
    merchantsData: [],//某一分类下的所有标记点数据
    activeMerchantIndex:''//当前激活的标记点对应的index索引，默认为0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var api = app.golbalData.api;
    wx.request({
      url: api + '/app/getCategory',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data
        var category = "";
        for (var i = 0; i < data.length; i++) {
          category += data[i].category + ","
        }
        //去掉最后一个逗号
        if (data.length > 0) {
          category = category.substr(0, category.length - 1);
        }
        category = category.split(',');
        //console.log(category)
        that.setData({
          activeCategory: category[0],
          categoryData: category
        })
        let categoryID = that.data.categoryData.indexOf(that.data.activeCategory);
        app.golbalData.categoryID = categoryID;
        //console.log(that.data.categoryData)
        //console.log(that.data.activeCategory)
        //console.log(categoryID);
        wx.getStorage({
          key: 'image',
          success: function (res) {
            //console.log(res.data)
            var shuju = res.data
            that.setData({
              merchantsData: shuju
            })
            //console.log('使用了本地缓存')
          },
          fail: function () {
            //console.log('没有使用缓存')
          }
        })
        that.getCategory(that.data.activeCategory, function (res) {
          //console.log(res);
          let merchantsData = res.data
          that.setData({
            merchantsData: merchantsData
          })
          that.setMarkers(merchantsData);
          wx.setStorage({
            key: 'image',
            data: merchantsData
          })
          //console.log('将数据存入本地')
        });
      }
    })
    
  },
  //获取某一分类下所有标记点数据
  getCategory(name, cb) {
    var that = this;
    var api = app.golbalData.api;
    wx.request({
      url: api+'/app/getMapByCategory',
      method: 'post',
      data: { category: name },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        cb(res)
        that.setData({
          activeMerchantIndex: 0,
          intoview: 'data' + res.data[0].id
        })
      }
    })
  },

  //在地图上显示获取的标记点位置
  setMarkers(merchants) {
    let markers = [];
    let categoryID = app.golbalData.categoryID;
    merchants.forEach((item) => {
      let marker = {
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: '../../resource/images/' + categoryID + '.png',
        width: 32,
        height: 40
      }
      markers.push(marker)
    })

    this.setData({
      markers
    })
  },

  categoryChange: function (e) {
    var that = this
    //console.log(e);
    var category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    })
    let categoryID = this.data.categoryData.indexOf(category);
    //console.log(categoryID);
    app.golbalData.categoryID = categoryID;

    this.getCategory(category, function (res) {
      //获取所选分类下的数据
      //console.log(res);
      let merchantsData = res.data;
      that.setData({
        merchantsData:merchantsData
      })
      that.setMarkers(merchantsData)
    });
  },
  switchMerchantsItems(e) {
    this.setData({
      isSpread: !this.data.isSpread
    })
  },

  markerTap:function(e){
    //console.log(e);
    let markerId = e.markerId;
    let markers = this.data.markers;
    let categoryID = app.golbalData.categoryID;
    let merchantsData = this.data.merchantsData;
    //更新选中标记点的图标
    markers.forEach(item => {
      if (item.id == markerId) {
        item.iconPath = "../../resource/images/" + categoryID + "choosed.png";
      } else {
        item.iconPath = "../../resource/images/" + categoryID + ".png";
      }
    })
    //更新地图上的标记点数据
    this.setData({
      markers,
      intoview: 'data'+markerId 
    })
    //更新底部可滚动视图区域的横向滚动条位置
    let scrollLeft;
    // let activeMerchantIndex;
    merchantsData.forEach((item, index) => {
      if (item.id == markerId) {
        scrollLeft = index * 140;
        this.setData({
          activeMerchantIndex: index
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})