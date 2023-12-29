// 云函数入口文件
const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

const {storage} = new CloudBase()

const cloudPath = "cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/"

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    console.log("query_files wxContext:",wxContext)

    let ret = await storage.listDirectoryFiles("imgs/")

    let imgs = []

    ret.forEach((item)=>{
        if (item.Size > 0) {
            imgs.push(cloudPath + item.Key)
        }
    })

    return {
        event,
        data:imgs,
        wxContext,
    }
}