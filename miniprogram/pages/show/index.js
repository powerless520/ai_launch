/* 展示首页 */

Page({
    // 存储请求结果
    data: {
        shows: ['cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/1.jpg', 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/imgs/2.jpg'],
        videoUrl: 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/videos/duck.mp4',
        videoUrls: ['cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/videos/duck.mp4', 'cloud://dys-5ge8fwdj0c7fd7fe.6479-dys-5ge8fwdj0c7fd7fe-1323321701/videos/pig.mp4']
    },

    onShow() {
        // this.getVideoUrl();
        let ret = this.getFiles();
        console.log("ret:",ret)
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

        const current = e.currentTarget.dataset.ix;
        console.log("previewImage:", JSON.stringify(current))
        wx.previewImage({
            current: current,
            urls: this.data.shows,
        });
    },

    getFiles: function (e) {
        wx.cloud.callFunction({
            name: 'get_files',
            success: function (res) {
                console.log("call get_files:", res)
                return res
            },
            fail: function (err) {
                console.log("call get_files error:", err)
                return err
            }
        })
    }
})