exports.AttributeType = {
    'select': {},//多选
    'radio': {},//单选
    'check': {},//勾选
    'text': {},//文本
    'number': {},//数字
    'decimal': {},//金额
};

exports.PaymentsType = {
    'wallet': 'payments.wallet',
    'alipay': 'payments.alipay',
    'wechat': 'payments.wechat',
};

exports.ApiCodes = {
    SUCCESS: 1001,
    FAIL: 1004,
    NOT_FOUND: 1404,
};

exports.SmsCodesType = {
    LOGIN_CODE: 'login_code',
    REGISTER: 'register',
    BIND_PHONE: 'bind_phone'
};

exports.PartnerType = {
    Wechat: 'partner.wechat',
    Alipay: 'partner.alipay',
    Tecent: 'partner.qq',
}

exports.CommentsType = {
    rent: 'order.rent.comments',
}

exports.UserWalletType = {
    trade: 'wallet.tradeMoney',
    money: 'wallet.money',
    freeze: 'wallet.freeze'
};

exports.REDIS_KEYS = {
    CHAT_USER_STACK: 'chat_user_stack_',
    WX_ACCESS_TOKEN: 'pub_access_token',
    WX_JSSDK_TICKET: 'wx_js_sdk_ticket'
}
