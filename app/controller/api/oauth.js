'use strict';

const Controller = require('egg').Controller;
const WxOauth = require('../../extend/wechat');
const Enums = require('../../extend/enums');

class OauthController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async login() {
        const {ctx} = this;
        let params = ctx.request.body;

    }
}

module.exports = OauthController;
