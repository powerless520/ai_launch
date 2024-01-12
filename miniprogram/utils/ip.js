export function getIp(){
    wx.getLocalIpAddress({
        success: function(res) {
            console.log(res.ip) // 本地IP地址
            console.log(res.subnetMask) // 子网掩码
            console.log(res.gateway) // 网关
        },
        fail:function (err){
            console.error(err)
        }
    })
}