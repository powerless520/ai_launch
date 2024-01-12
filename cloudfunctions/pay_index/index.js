// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("do_pay event:", event)
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : event.body, // 商品描述
    "outTradeNo" : event.outTradeNo, // 商户订单号
    "spbillCreateIp" : "192.168.0.1", // 终端 IP
    "subMchId" : event.subMchId, // 商户号
    "totalFee" : 1, // 总金额
    "envId": event.envId, // 云函数环境名称
    "functionName": "pay_cb" // 支付结果通知回调云函数名
  })
  return res
}