let timer = null;
Page({
  data: {
    isQuickLogin: true,
    quickLoginText: '微信用户快速登录',
    smsLoginText: '输入手机号码登录/注册',
    btnText: '开始',
    isProtocol: false,
    isLogin: false,
    isActive: -1,
    isLogin: false,
    tel: '',
    randomCode : '',
    identify: '',
    count:60,
  },
  onLoad (option) {
  },
  onShow() {
  },
  goToMbkLogin: function goToMbkLogin(e) {
    this.setData({
      isQuickLogin: false
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log(e)
  },
  onLoginSubmitTap: function onLoginSubmitTap() {
    // 确认登录
  },
  isPhone: function(e) {
    let tel = e.detail.value
    // 正则验证
    let isValid = /^1[3456789]\d{9}$/.test(tel);
    if (isValid) {
      this.setData({
        isActive: 1,
        tel: tel
      })
    }
  },
  isCodeNull: function(e){
    let randomCode = e.detail.value
    // 正则验证
    let isValid = /^\d{6}$/.test(randomCode);
    if (isValid) {
      this.setData({
        isLogin: true,
        randomCode: randomCode
      })
    }
  },
  getCode: function(){
    let self = this;
    self.countDown();
    self.setData({
      isActive: 2,
    })
    // 获取验证码
    wx.request({
      url: 'http://47.94.0.63/shared/randomCode',
      data:{
        tel: self.data.tel
      },
      success(res) {
        console.log('res: ',res);
        self.setData({
          identify: res.data.data,
        })
      }
    })
  },
  countDown: function() {
    let self = this;
    timer = setTimeout(function () {
      self.setData({
        count: self.data.count-1
      })
      if (self.data.count<=0) {
        // 正则验证
        let isValid = /^1[3456789]\d{9}$/.test(self.data.tel);
        if (isValid) {
          self.setData({
            isActive: 1,
          })
        }else{
          self.setData({
            isActive: -1
          })
        }
        return
      }
      self.countDown();
    }, 1000);
  },
  login: function(){
    let self = this;
    // 登陆
    wx.login({
      success(res) {
        let jscode = res.code
        wx.request({
          url: 'http://47.94.0.63/customer/login',
          data: {
            randomCode: self.data.randomCode,
            tel: self.data.tel,
            identify: self.data.identify
          },
          success(res) {
            // 登录成功
            console.log('res: ',res)
          }
        })
      }
    })
  }
});
