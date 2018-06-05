'use strict';

const Controller = require('egg').Controller;
const Enums = require('../../extend/enums');
module.exports = class MyController extends Controller {
    async index() {
        const {ctx} = this;
    }

    async profile() {
        const {ctx} = this;
        console.log(ctx.user);
        ctx.body = {
            code: Enums.ApiCodes.SUCCESS,
            data: ctx.user,
        };
    }

    async starGames() {


    }
};

