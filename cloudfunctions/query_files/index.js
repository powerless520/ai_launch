// 云函数入口文件
const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

const {storage} = new CloudBase()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    console.log("query_files wxContext:",wxContext)

    let ret = await storage.listDirectoryFiles("imgs/")

    return {
        event,
        ret,
        wxContext,
    }
}