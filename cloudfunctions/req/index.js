// 云函数入口文件
const cloud = require('wx-server-sdk')

// 用于网络请求
var rp = require('request-promise');

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    console.log("req event")
    console.log(event)
    let url = event.url
    let method = event.method
    let params = event.params

    let options = {
        url: url,
        method: method == null ? 'GET' : method,
        body: params,
    }

    return await rp(options)
        .then(function (res) {
            return res
        }).catch(function (err) {
            return '失败' + JSON.stringify(err)
        })
}