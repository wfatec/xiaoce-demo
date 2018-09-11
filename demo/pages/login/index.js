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
    phoneNo: '',
    smscode: ''
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
    let phoneNo = e.detail.value
    // 正则验证
    let isValid = /^1[3456789]\d{9}$/.test(phoneNo);
    if (isValid) {
      this.setData({
        isActive: 1,
        phoneNo: phoneNo
      })
    }
  },
  isCodeNull: function(e){
    let smscode = e.detail.value
    // 正则验证
    let isValid = /^\d{6}$/.test(smscode);
    if (isValid) {
      this.setData({
        isLogin: true,
        smscode: smscode
      })
    }
  },
  getCode: function(){
    // 获取验证码
    wx.request({
      url: 'https://path/to/sendcode',
      success(res) {
      }
    })
  },
  login: function(){
    // 登陆
    wx.login({
      success(res) {
        let jscode = res.code
        wx.request({
          url: 'https://path/to/smslogin',
          data: {
            jscode,
            smscode: self.data.smscode,
            phoneNo: self.data.phoneNo
          },
          success(res) {
            // 登录成功
            let {
              userid,
              accesstoken
            } = res
          }
        })
      }
    })
  }
});
