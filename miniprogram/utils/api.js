
function net_get(url,params) {
    // test req
    wx.cloud.callFunction({
        name:'req',
        data:{
            url:url,
            method:'GET',
            params:params
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
            url: url,
            method: 'POST',
            params: params
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

const requestUtil = (url, method = 'GET', params = {}) => {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'req',  // 云函数名称
            data: {
                url: url,
                method: method,
                params: params,
            },
            success: res => {
                const data = res.result;
                resolve(data);
            },
            fail: err => {
                console.error('请求失败:', err);
                reject(err);
            },
        });
    });
};

module.exports = requestUtil;
