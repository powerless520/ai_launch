// pages/index/index.js
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
        console.log("bindInput inputValue:", this.data.inputValue)
    },

    sendRequest: function () {
        console.log()
        // 获取输入框的值
        const inputValue = this.data.inputValue.trim();

        // 当输入框不为空时，显示图片
        if (inputValue !== '') {
            let showUrl = 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/WechatIMG2617.jpg'
            this.setData({
                showImage: true, // 显示图片
                inputValue: '', // 清空输入框
                imageUrl: showUrl, // 设置图片链接
            });
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
        // console.log("touchImage:",e)
        // console.log("touchImage showImage:",this.data.showImage)
        // this.setData({
        //   showImage: !this.data.showImage, // 显示图片
        // })
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
