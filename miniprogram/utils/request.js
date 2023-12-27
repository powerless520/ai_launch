// utils/request.js

// set url
const BASE_URL = 'https://api.example.com';

function request(url, method, data = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${BASE_URL}${url}`,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                // 在这里可以添加一些其他的请求头
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            },
            fail: (error) => {
                reject(error);
            },
        });
    });
}

module.exports = request;
