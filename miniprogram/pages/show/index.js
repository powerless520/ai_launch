/* 展示首页 */

Page({
    // 存储请求结果
    data: {
        shows: [],
        videoUrl: '',
        videoUrls: []
    },
    ims :[],

    onShow() {
        // this.getVideoUrl();
        let data = this.getFiles();
        console.log("data:",data)
    },

    getVideoUrl: function () {
        // 请替换为实际的文件ID
        const fileId = '';

        let cloud = wx.cloud
        console.log("cloud:", cloud)

        var fs = wx.getFileSystemManager()
        console.log("fs:", fs)

        wx.cloud.getTempFileURL({
            fileList: this.data.videoUrls,
            success: (res) => {
                console.log(res)
                const tempFileURL = res.fileList[0].tempFileURL;
                this.setData({
                    videoUrl: tempFileURL,
                });
            },
            fail: (error) => {
                console.error('获取视频链接失败', error);
            },
        });
    },

    previewImage: function (e) {

        const current = e.currentTarget.dataset.src;
        // console.log("previewImage:", JSON.stringify(current))
        wx.previewImage({
            current: current,
            urls: this.data.shows,
        });
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
    }
})