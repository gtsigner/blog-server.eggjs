const Service = require('egg').Service;

class UserService extends Service {

    get model() {
        return this.ctx.model.User;
    }

    async find() {
        return await this.model.findOne();
    }

    async getUserFromAccessToken(accessToken) {
        const {ctx} = this;
        try {
            let us = await ctx.app.jwt.verify(accessToken, ctx.app.config.jwt.secret);
            return await ctx.model.User.findOne({_id: us.userId});
        } catch (e) {
            return null;
        }
    }

    /**
     * 创建AccessToken
     * @param user
     * @returns {Promise<number | PromiseLike<ArrayBuffer>>}
     * @private
     */
    async _createAccessToken(user) {
        const {ctx} = this;
        let authToken = ctx.app.jwt.sign({
            userId: user._id,
            phone: user.phone,
        }, ctx.app.config.jwt.secret);
        //授权登陆
        await this.model.updateOne({_id: user._id}, {accessToken: authToken});//
        //然后返回AccessToken
        return authToken;
    }

    /**
     * 通过密码登陆
     * @param username
     * @param password
     */
    async loginPwd(username, password) {
        const {ctx} = this;
        let user = await this.model.findOne({
            phone: username,
            password: ctx.md5(password + ctx.app.config.web.secret)
        });
        if (null === user) {
            throw new Error('用户名或者密码错误');
        }
        const at = await this._createAccessToken(user);
        ctx.cookies.set('access_token', at);
        return {at, user};
    }

    async bindPhone(_userId, params) {
        const {ctx} = this;
        let user = await this.model.findOne({_id: _userId});
        if (null !== await this.model.findOne({phone: params.phone})) {
            throw new Error('该手机号码已绑定了其他用户,请更换');
        }
        const alias = {
            _boundId: '',
            type: 'partner.phone',
            nickname: params.phone,
            data: params.phone
        };
        await this.model.update({_id: _userId}, {
            $set: {
                phone: params.phone,
                password: ctx.md5(params.password + ctx.app.config.web.secret)
            }, $push: {'alias': alias}
        });
        return true;
    }

}

module.exports = UserService;
