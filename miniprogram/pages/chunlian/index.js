// pages/index/index.js
Page({
  data: {
    coupletText: '',
    coupletImage: '',
    shows:[],
  },

  onShow() {
    // this.getVideoUrl();
    this.getFiles();
  },

  onInput: function (e) {
    this.setData({
      coupletText: e.detail.value
    });
  },

  generateCouplet: function () {

    console.log("input text:" + this.data.coupletText)
    // let ret = this.generateImageWithText(this.data.coupletText)
    // console.log("generateCouplet ret:",ret)
    this.generateCoupletImage();
  },

  generateCoupletImage: function () {
    // 示例：生成一张固定的春联图片，并更新到coupletImage
    // const imageSrc = 'https://s11.ax1x.com/2024/01/10/pF9PGIH.png'; // 这里假设couplet.jpg是你的春联图片
    // console.log(this.data.shows.length)
    let showLenth = this.data.shows.length
    console.log("showLenth:",showLenth)
    let randomIndex = this.getRandomIndex(showLenth-1)
    console.log("randomIndex:",randomIndex)
    let imageSrc = this.data.shows[randomIndex]; // 这里假设couplet.jpg是你的春联图片
    console.log("imageSrc:",imageSrc)
    this.setData({
        coupletImage: imageSrc,
    })
  },

  getFiles: function (e) {
    var that = this
    wx.cloud.callFunction({
      name: 'query_files',
      success: function (res) {
        console.log("call function get_files:", res)
        that.setData({
          shows: res.result.data
        })
      },
      fail: function (err) {
        console.log("call function get_files error:", err)
      }
    })
  },

  getRandomIndex: function (len) {
    const middleIndex = Math.floor(len / 2);
    const randomIndex = Math.floor(Math.random() * middleIndex * 2) + (middleIndex - Math.floor(middleIndex / 2));
    return randomIndex;
  },

  generateImageWithText:function (text){
    let ret
    var that = this
    wx.cloud.callFunction({
      name: 'req',
      data: {
        url: "http://ip-api.com/json",
        method: "GET",
        params:text,
      },
      success: function (res) {
        console.log("call function generateImageWithText:", res)
        ret = res.result
        console.log("success ret:",ret)
      },
      fail: function (err) {
        console.log("call function generateImageWithText error:", err)
        ret = err
      }
    })
    return ret
  }
});
