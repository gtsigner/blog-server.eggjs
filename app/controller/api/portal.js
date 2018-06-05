'use strict';

const Controller = require('egg').Controller;
const Enums = require('../../extend/enums');
module.exports = class PortalController extends Controller {

    async login() {
        const {ctx} = this;
        try {
            const params = ctx.request.body;
            //Username  Password
            let logs = {
                username: params.username,
                password: params.password
            };
            let {user, at} = await ctx.service.user.loginPwd(logs.username, logs.password);
            ctx.body = {
                data: {
                    user: user,
                    accessToken: at
                },
                code: Enums.ApiCodes.SUCCESS,
                message: '登录成功'
            }
        } catch (e) {
            ctx.body = {code: Enums.ApiCodes.FAIL, message: e.message};
        }
    }

    /**
     * 如果调用这个方法，就是手机验证码登录，可以直接进行注册了
     * @returns {Promise<void>}
     */
    async phoneSmsCode() {

    }

    async sendSmsCode() {
        const {ctx} = this;
        const params = ctx.request.body;
        let phone = params.phone;
        try {
            let code = await ctx.service.sms.sendSmsCode(phone, Enums.SmsCodesType.REGISTER);
            ctx.body = {
                message: '短信验证码已发送成功',
                data: {code: code},
                code: Enums.ApiCodes.SUCCESS
            };
        } catch (e) {
            ctx.body = {message: e.message, code: Enums.ApiCodes.FAIL};
        }
    }

    async register() {
        const {ctx} = this;
        try {
            const params = ctx.request.body;
            //Username  Password
            let user = {
                username: params.username,
                password: params.password,
                smsCode: params.smsCode,
            };
            //ctx.validate({username: 'china-phone'}, user);
            let res = await ctx.model.User.findOne({username: params.username});
            if (res) throw new Error('对不起,该手机号已绑定其他用户');
            if (false === await ctx.service.sms.verifySmsCode(user.username, user.smsCode, Enums.SmsCodesType.REGISTER)) {
                //  throw new Error('验证码错误');
            }
            //创建用户
            let newUser = new ctx.model.User({
                username: user.username,
                phone: user.username,
                nickname: user.username,
                avatar: '/images/default.png',
                password: ctx.md5(user.password + ctx.app.config.web.secret),
                createAt: new Date(),
                lock: false,
                status: 1
            });
            await newUser.save();
            let {at} = await ctx.service.user.loginPwd(user.username, user.password);
            ctx.body = {
                data: {
                    accessToken: at,
                    user: newUser
                },
                code: Enums.ApiCodes.SUCCESS,
                message: '注册成功'
            }
        } catch (e) {
            ctx.body = {code: Enums.ApiCodes.FAIL, message: e.message};
        }
    }

    async logout() {
        const {ctx} = this;
        ctx.session = null;
        ctx.cookies.set('access_token', null);
        ctx.body = {code: Enums.ApiCodes.SUCCESS};
    }
};

