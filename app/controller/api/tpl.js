'use strict';

const Controller = require('egg').Controller;
const Enums=require('../../extend/enums');
module.exports =class XXController extends Controller {
    index() {
        const {ctx} = this;
    }

    create() {
        const {ctx} = this;
        let params = ctx.request.body;
    }

    show() {
        const {ctx} = this;
        let id = ctx.params.id;
    }


}

