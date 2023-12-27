
function net_get(url,params) {
    // test req
    wx.cloud.callFunction({
        name:'req',
        data:{
            url:'http://30l4mp0o.dongtaiyuming.net/'
        },
        success:function (res){
            return res.result
        },
        fail:function (err) { console.error("fail")}
    })
}

export function net_post(url, params) {
    // test req
    wx.cloud.callFunction({
        name: 'req',
        data: {
            url: 'http://30l4mp0o.dongtaiyuming.net/'
        },
        success: function (res) {
            let data = res.result
            console.log('call', data)
        },
        fail: function (err) {
            console.error("fail")
        }
    })
}

