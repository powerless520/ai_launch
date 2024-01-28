// pages/index/index.js
import UserUtils from "../../utils/uuid.js";
import requestUtil from "../../utils/api.js";

Page({
    data: {
        inputValue: '',
        showImage: false, // 初始时不显示图片
        imageUrl: '',
        startY: 0, // 触摸起始Y坐标
        endY: 0, // 触摸结束Y坐标
        wallpaperUrl: 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/0b5c0174154493ee1338e9a162368e7d.jpg'
    },

    bindValue: function (e) {
        this.setData({
            inputValue: e.detail.value
        });
    },

    sendRequest: function (format, data) {
        // 获取输入框的值
        const inputValue = this.data.inputValue.trim();
        console.log("sendRequest:", inputValue," to generate url")

        // 当输入框不为空时，显示图片
        if (inputValue !== '') {
            // todo input value generate image url by request
            let showUrl = 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/WechatIMG2617.jpg'
            // let showUrl = ''
            // request replace hardcode url
            // let sendUrl = 'http://ip-api.com/json'
            // let sendUrl = 'http://127.0.0.1:8177/chunlian'
            let sendUrl = 'http://146.56.237.180:8188/img' // 云服务器地址

            // var that = this
            requestUtil(sendUrl, 'POST', {
                // 'uuid':UserUtils.generateRandomUserID(10),
                'text':inputValue
            }).then(res => {
                // 检查 res.data 是否为有效值
                if (res !== undefined) {
                  let retData = JSON.parse(res)
                  console.log("requestUtil then:", retData);
                    this.setData({
                        showImage: true,
                        inputValue: '',
                        imageUrl: retData.data,
                    }, () => {
                        // setData 回调中进行下一步操作
                        console.log('imageUrl:', this.data.imageUrl);
                    });
                } else {
                    console.warn("res is undefined. Not updating imageUrl.");
                }
              // console.log('imageUrl begin:' + this.data.imageUrl)
              // this.data.imageUrl = res.data
              // console.log('imageUrl end:' + this.data.imageUrl)
            }).catch(err => {
                console.error("requestUtil Error:", err)
            })
        } else {
            wx.showToast({
                title: '请输入内容', // 输入框为空时显示提示
                icon: 'none'
            });
        }
    },

    saveImage: function () {
        // 在这里处理保存图片的逻辑，你可以使用 wx.saveImageToPhotosAlbum
        // 例如：wx.saveImageToPhotosAlbum({ filePath: this.data.imageUrl });
    },

    hiddenImage: function(e) {
        this.setData({
            showImage: false, // 显示图片
            imageUrl: '', // 设置图片链接
        })
    },

    touchImage: function (e) {
        // 预览模式
        wx.previewImage({
            current: this.data.imageUrl, // 当前显示图片的链接
            urls: [this.data.imageUrl],   // 需要预览的图片链接列表
        })
    },

    closeImage: function () {
        // 关闭图片显示，回到输入框
        this.setData({
            showImage: false
        });
    },

    startTouch: function (e) {
        // 记录触摸起始Y坐标
        this.setData({
            startY: e.touches[0].clientY
        });
    },

    moveTouch: function (e) {
        // 计算触摸移动的距离
        const deltaY = e.touches[0].clientY - this.data.startY;
        // 限制向上滑动的距离，不超过屏幕高度
        if (deltaY < wx.getSystemInfoSync().windowHeight) {
            this.setData({
                endY: deltaY
            });
        }
    },

    endTouch: function (e) {
        // 当触摸结束时，如果向上滑动的距离超过屏幕高度的一半，则关闭图片显示
        if (this.data.endY > wx.getSystemInfoSync().windowHeight / 2) {
            this.closeImage();
        } else {
            // 否则重置滑动距离，保持图片显示
            this.setData({
                endY: 0
            });
        }
    },

});
