// pages/index/index.js
const payUtil = require('../../utils/pay.js')

Page({
    data: {
        coupletText: '',
        coupletImage: 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/WechatIMG2614.jpg',
        shows: ['cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/WechatIMG2614.jpg', 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/WechatIMG2617.jpg'],
    },

    onShow() {
        // this.getVideoUrl();
        // this.getFiles();
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
        // this.generateUser();
        // this.pay();
    },


    generatePay: function () {

        // console.log("input text:" + this.data.coupletText)
        // let ret = this.generateImageWithText(this.data.coupletText)
        // console.log("generateCouplet ret:",ret)
        // this.generateCoupletImage();
        // this.generateUser();
        this.pay();
    },

    generateCoupletImage: function () {
        // 示例：生成一张固定的春联图片，并更新到coupletImage
        // const imageSrc = 'https://s11.ax1x.com/2024/01/10/pF9PGIH.png'; // 这里假设couplet.jpg是你的春联图片
        // console.log(this.data.shows.length)
        let showLenth = this.data.shows.length
        console.log("showLenth:", showLenth)
        let randomIndex = this.getRandomIndex(showLenth - 1)
        console.log("randomIndex:", randomIndex)
        let imageSrc = this.data.shows[randomIndex]; // 这里假设couplet.jpg是你的春联图片
        console.log("imageSrc:", imageSrc)
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

    generateImageWithText: function (text) {
        let ret
        var that = this
        wx.cloud.callFunction({
            name: 'req',
            data: {
                url: "http://ip-api.com/json",
                method: "GET",
                params: text,
            },
            success: function (res) {
                console.log("call function generateImageWithText:", res)
                ret = res.result
                console.log("success ret:", ret)
            },
            fail: function (err) {
                console.log("call function generateImageWithText error:", err)
                ret = err
            }
        })
        return ret
    },

    generateUser: function (e) {
        getApp().getOpenId().then(async openid => {
            console.log("generateUser openid:", openid)
            // 根据 _openId 数据，查询并展示待办列表
            const db = await getApp().database()
            db.collection('user').where({
                _openid: openid
            }).get().then(res => {
                console.log("generateUser res:", res)
                // 存储查询到的数据
            })
        })
    },

    pay: function () {
        let envId = 'dys-5ge8fwdj0c7fd7fe'

        getApp().getOpenId().then(openid => {
            console.log("pay openid:", openid)
            let orderId = openid.slice(0, 10) + new Date().getTime().toString()
            console.log("pay order_id:", orderId)
            if (orderId === undefined || orderId === '') {
                console.log("pay order_id is empty")
                return
            }
            let orderModel = buildOrder(openid, 1)
            console.log("pay orderModel:", orderModel)
            wx.cloud.callFunction({
                name: 'pay_index',
                data: {
                    body: '春联支付',
                    outTradeNo: orderId,
                    subMchId: '1665685145',
                    envId: envId,
                    order_model:orderModel
                },
                success: res => {
                    const payment = res.result.payment
                    console.log("pay success:", payment)
                    wx.requestPayment({
                        ...payment,
                        success(res) {
                            console.log('pay success', res)
                        },
                        fail(err) {
                            console.error('pay fail', err)
                        }
                    })
                },
                fail: console.error,
            })
        }).catch(err => {
            console.log("pay err:", err)
        })
    },

    buildOrder: function (user_id,price) {
        let order = Order
        order.order_id = user_id + new Date().getTime().toString()
        order.pay_price = price
        return order
    }
});

