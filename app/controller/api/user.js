'use strict';

const Controller = require('egg').Controller;
const Enums = require('../../extend/enums');

class UserController extends Controller {

    //验证ID
    async index() {
        const {ctx} = this;
    }

    async me() {
        const {ctx} = this;
        ctx.body = ctx.user;
    }

    async show() {
        const {ctx} = this;
    }

    async list() {
        const {ctx} = this;
        let users = await ctx.model.User.find({}).sort({createAt: 1}).exec();

        ctx.body = users;
    }

}

module.exports = UserController;
