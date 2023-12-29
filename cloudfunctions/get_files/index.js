// 云函数入口文件
const cloud = require('wx-server-sdk')
const manageNode = require('@cloudbase/manager-node')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const {
  storage
} = new manageNode()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const res = await storage.listDirectoryFiles("imgs/")
  console.log("cloud function get_files:",res)
  return {
    event,
    data:res
  }
}