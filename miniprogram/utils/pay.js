export function pay_do(){
  wx.cloud.callFunction({
    name: 'd-pay',
    data: {
      
    },
    success: res => {
      const payment = res.result.payment
      wx.requestPayment({
        ...payment,
        success (res) {
          console.log('pay success', res)
        },
        fail (err) {
          console.error('pay fail', err)
        }
      })
    },
    fail: console.error,
  })
}